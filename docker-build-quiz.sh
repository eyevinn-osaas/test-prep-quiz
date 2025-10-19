#!/bin/bash
# Build multi-arch images, push to Docker Hub, copy compose to Pi, and restart.

set -euo pipefail

# --- CONFIG ---
DOCKER_REPO_SERVER="${DOCKER_REPO_SERVER:-iqesolutions/test-prep-quiz-server}"
DOCKER_REPO_WEB="${DOCKER_REPO_WEB:-iqesolutions/test-prep-quiz-web}"
TAG="${TAG:-latest}"

REMOTE_USER="${REMOTE_USER:-magnusjohansson}"
REMOTE_HOST="${REMOTE_HOST:-raspberrypi.local}"
REMOTE_DIR="${REMOTE_DIR:-/home/$REMOTE_USER/apps/test-prep-quiz}"
REMOTE_COMPOSE="${REMOTE_COMPOSE:-$REMOTE_DIR/docker-compose-headless-quiz.yml}"

KEYCHAIN_SERVICE="${KEYCHAIN_SERVICE:-raspberrypi_scp}"   # optional, macOS Keychain
RETRIES="${RETRIES:-3}"
SLEEP_BETWEEN="${SLEEP_BETWEEN:-2}"

SSH_OPTS=(-o StrictHostKeyChecking=no -o ConnectTimeout=10)

ts(){ date +"%Y-%m-%d %H:%M:%S"; }
log(){ echo "[$(ts)] $*"; }
die(){ echo "[$(ts)] ❌ $*" >&2; exit 1; }
need(){ command -v "$1" >/dev/null 2>&1 || die "Missing dependency: $1"; }

need docker
need ssh
need scp

# Optional: fetch password from Keychain and use sshpass if available
PASSWORD=""
if command -v security >/dev/null 2>&1 && command -v sshpass >/dev/null 2>&1; then
  if security find-generic-password -s "$KEYCHAIN_SERVICE" -w >/dev/null 2>&1; then
    PASSWORD="$(security find-generic-password -s "$KEYCHAIN_SERVICE" -w)"
    SSH="sshpass -p \"$PASSWORD\" ssh ${SSH_OPTS[*]}"
    SCP="sshpass -p \"$PASSWORD\" scp ${SSH_OPTS[*]}"
  fi
fi
# Fallback to normal ssh/scp (assumes key-based auth or agent)
SSH="${SSH:-ssh ${SSH_OPTS[*]}}"
SCP="${SCP:-scp ${SSH_OPTS[*]}}"

log "🔧 Ensuring buildx builder"
docker buildx create --use --name testprep-quiz-builder >/dev/null 2>&1 || true

log "🐳 Building & pushing server -> ${DOCKER_REPO_SERVER}:${TAG}"
docker buildx build --platform linux/amd64,linux/arm64 \
  -t "${DOCKER_REPO_SERVER}:${TAG}" --push ./server

log "🐳 Building & pushing web -> ${DOCKER_REPO_WEB}:${TAG}"
docker buildx build --platform linux/amd64,linux/arm64 \
  -t "${DOCKER_REPO_WEB}:${TAG}" --push ./web

# Helper retry
ssh_retry() {
  local cmd="$1" i=1
  while :; do
    if eval "$SSH \"$REMOTE_USER@$REMOTE_HOST\" \"$cmd\""; then return 0; fi
    if (( i >= RETRIES )); then return 1; fi
    log "⏳ SSH cmd failed (attempt $i/$RETRIES), retrying in ${SLEEP_BETWEEN}s…"
    sleep "$SLEEP_BETWEEN"; ((i++))
  done
}

log "📁 Creating remote dir: ${REMOTE_DIR}"
ssh_retry "mkdir -p '$REMOTE_DIR'"

log "📝 Uploading compose -> ${REMOTE_COMPOSE}"
eval "$SCP docker-compose-headless-quiz.yml \"$REMOTE_USER@$REMOTE_HOST:$REMOTE_COMPOSE\""

log "🔁 Pulling & restarting on Pi"
ssh_retry "cd '$REMOTE_DIR' && DOCKER_REPO_SERVER='${DOCKER_REPO_SERVER}' DOCKER_REPO_WEB='${DOCKER_REPO_WEB}' docker compose -f '$REMOTE_COMPOSE' pull && docker compose -f '$REMOTE_COMPOSE' up -d"

log "🩺 Quick check"
ssh_retry "curl -fsS http://localhost:8792 >/dev/null" \
  && log "✅ Web responds on port 8792" \
  || log "⚠️  Could not reach web on 8792 (it may still be starting)"

log "🎉 Done."