# ⚡ Test Prep Quiz - Multiplayer Quiz Game

A real-time multiplayer quiz application perfect for classrooms, parties, and study sessions. Features themed games, avatar selection, live scoreboards, and support for casting to TVs via Chromecast.

Built for a 9-year-old's birthday party and battle-tested with kids, but versatile enough for educational use with custom question packs.

## ✨ Features

### 🎮 Game Modes
- **Public Rooms**: Browse and join available games from a lobby
- **Private Rooms**: Create password-free private games with room codes
- **Game Master View**: Control the game flow, see all players, manage questions
- **Player View**: Join games, answer questions, track your score

### 🎨 Visual Features
- **7 Built-in Themes**: Birthday, Halloween, Space, Ocean, Unicorn, Winter, Classic
- **Animated Backgrounds**: Theme-specific visual effects (balloons, floating objects, etc.)
- **Confetti & Celebrations**: Winner announcements with visual effects
- **Sound Effects**: Optional audio feedback (can be muted)
- **Avatar Selection**: 16 emoji avatars to choose from
- **Responsive Design**: Works on mobile, tablet, desktop, and TV (Chromecast)

### 🎯 Game Features
- **Customizable Question Packs**: Create your own JSON-based question sets
- **Real-time Updates**: Socket.io for instant synchronization
- **Flexible Timing**: Adjust question duration (5-120 seconds)
- **Score Tracking**: Live scoreboard with rankings
- **Wake Lock**: Prevents screen from sleeping during active questions
- **Wrong Answer Feedback**: Red highlight for incorrect answers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for local development)
- Docker & Docker Compose (for deployment)
- Git

### Local Development (Laptop/Desktop)

1. **Clone the repository**
   ```bash
   git clone https://github.com/nolltre-lab/test-prep-quiz.git
   cd test-prep-quiz
   ```

2. **Start the server**
   ```bash
   cd server
   npm install
   npm start
   ```
   Server runs on `http://localhost:8793`

3. **Start the web app** (in a new terminal)
   ```bash
   cd web
   npm install
   npm run dev
   ```
   Web app runs on `http://localhost:5173`

4. **Access the application**
   - Game Master: `http://localhost:5173/gm`
   - Player Join: `http://localhost:5173/play`

### Docker Compose (Production)

Run both server and web app together:

```bash
docker compose up -d
```

Access at:
- Web UI: `http://localhost:8792`
- Server API: `http://localhost:8793`

## 📦 Deployment to Remote Device (Raspberry Pi)

This is perfect for running the quiz at a party or classroom where you want a dedicated server.

### One-Time Setup on Your Laptop

1. **Install required tools**
   ```bash
   # macOS
   brew install sshpass  # Optional, for password auth

   # Linux
   sudo apt-get install sshpass  # Optional, for password auth
   ```

2. **Set up environment variables** (optional)

   Create a `.env` file or export these variables:
   ```bash
   export DOCKER_REPO_SERVER="yourdockerhub/test-prep-quiz-server"
   export DOCKER_REPO_WEB="yourdockerhub/test-prep-quiz-web"
   export REMOTE_USER="pi"              # Your Pi username
   export REMOTE_HOST="raspberrypi.local"  # Your Pi hostname or IP
   export REMOTE_DIR="/home/pi/apps/test-prep-quiz"
   ```

3. **Configure SSH access**

   **Option A: SSH Key (Recommended)**
   ```bash
   # Generate SSH key if you don't have one
   ssh-keygen -t ed25519

   # Copy key to Raspberry Pi
   ssh-copy-id pi@raspberrypi.local
   ```

   **Option B: Password via Keychain (macOS only)**
   ```bash
   # Store password in macOS Keychain
   security add-generic-password \
     -s "raspberrypi_scp" \
     -a "$USER" \
     -w "your_raspberry_pi_password"
   ```

4. **Customize Docker Hub repository names** (if needed)

   Edit `docker-build-quiz.sh` and update:
   ```bash
   DOCKER_REPO_SERVER="${DOCKER_REPO_SERVER:-yourdockerhub/test-prep-quiz-server}"
   DOCKER_REPO_WEB="${DOCKER_REPO_WEB:-yourdockerhub/test-prep-quiz-web}"
   ```

### One-Time Setup on Raspberry Pi

1. **Install Docker**
   ```bash
   # Update system
   sudo apt-get update
   sudo apt-get upgrade -y

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Add your user to docker group
   sudo usermod -aG docker $USER

   # Log out and back in for group changes to take effect
   ```

2. **Install Docker Compose**
   ```bash
   sudo apt-get install docker-compose-plugin
   ```

3. **Create app directory**
   ```bash
   mkdir -p ~/apps/test-prep-quiz
   ```

### Deploy to Raspberry Pi

From your laptop, run:

```bash
./docker-build-quiz.sh
```

This script will:
1. Build multi-architecture Docker images (amd64 + arm64)
2. Push images to Docker Hub
3. Copy docker-compose file to Raspberry Pi
4. Pull and restart containers on the Pi

### Access the Quiz on Raspberry Pi

Once deployed:
- Find your Pi's IP: `hostname -I` (on the Pi)
- Web UI: `http://raspberry-pi-ip:8792`
- Cast to TV: Use Chrome browser's cast feature

### Customizing the Deployment Script

The `docker-build-quiz.sh` script supports these environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `DOCKER_REPO_SERVER` | `iqesolutions/test-prep-quiz-server` | Server Docker image repo |
| `DOCKER_REPO_WEB` | `iqesolutions/test-prep-quiz-web` | Web Docker image repo |
| `TAG` | `latest` | Docker image tag |
| `REMOTE_USER` | `magnusjohansson` | SSH username for Pi |
| `REMOTE_HOST` | `raspberrypi.local` | Pi hostname or IP |
| `REMOTE_DIR` | `/home/$REMOTE_USER/apps/test-prep-quiz` | App directory on Pi |
| `KEYCHAIN_SERVICE` | `raspberrypi_scp` | macOS Keychain service name |
| `RETRIES` | `3` | Number of SSH retry attempts |
| `SLEEP_BETWEEN` | `2` | Seconds between retries |

Example with custom values:
```bash
REMOTE_USER=pi \
REMOTE_HOST=192.168.1.100 \
DOCKER_REPO_SERVER=myrepo/quiz-server \
DOCKER_REPO_WEB=myrepo/quiz-web \
./docker-build-quiz.sh
```

## 📝 Creating Custom Question Packs

Question packs are JSON files located in `server/packs/`.

### Basic Structure

```json
{
  "title": "Your Pack Title",
  "items": [
    {
      "front": "What is the capital of France?",
      "back": "Paris",
      "hint": "City of lights",
      "choices": ["London", "Paris", "Berlin", "Madrid"],
      "answerIndex": 1,
      "tags": ["geography", "europe"]
    }
  ]
}
```

### Field Descriptions

- **title**: Display name for the question pack
- **items**: Array of question objects
  - **front**: The question text
  - **back**: The correct answer (for reference)
  - **hint**: Optional hint (not currently displayed in UI)
  - **choices**: Array of 4 answer choices
  - **answerIndex**: Index of correct answer (0-3)
  - **tags**: Optional array of category tags

### Adding Your Pack

1. Create a new `.json` file in `server/packs/`
2. Follow the structure above
3. Rebuild the server image or restart if running locally
4. Pack will appear in the Game Master pack selection

## 🎨 Creating Custom Themes

Themes are JSON files located in `server/themes/`.

### Theme Structure

```json
{
  "name": "mytheme",
  "vars": {
    "--bg-color": "#1a0a2e",
    "--panel": "#2d1b4e",
    "--ink": "#ffffff",
    "--muted": "#e0b3ff",
    "--accent": "#ff006e",
    "--good": "#00f5d4",
    "--bad": "#ff5252",
    "--bg-image": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "--font-family": "Arial, system-ui"
  },
  "effects": {
    "confetti": true,
    "balloons": true,
    "halloween": false,
    "snow": false,
    "stars": false,
    "bubbles": false,
    "unicorn": false
  },
  "preview": {
    "accent": "#ff006e",
    "bg": "#667eea"
  }
}
```

### CSS Variables

- `--bg-color`: Main background color
- `--panel`: Panel/card background color
- `--ink`: Main text color
- `--muted`: Secondary text color
- `--accent`: Highlight/button color
- `--good`: Correct answer color
- `--bad`: Wrong answer color
- `--bg-image`: Background gradient or image URL
- `--font-family`: Font stack

### Effect Flags

- `confetti`: Celebration confetti
- `balloons`: Floating balloons (birthday theme)
- `halloween`: Ghosts, pumpkins, bats
- `snow`: Falling snowflakes
- `stars`: Twinkling stars
- `bubbles`: Floating bubbles (ocean theme)
- `unicorn`: Rainbows and sparkles

## 🏗️ Project Structure

```
test-prep-quiz/
├── server/                    # Node.js backend
│   ├── index.js              # Socket.io server + REST API
│   ├── packs/                # Question pack JSON files
│   ├── themes/               # Theme JSON files
│   ├── package.json
│   └── Dockerfile
├── web/                      # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── socket.js         # Socket.io client
│   │   ├── api.js            # REST API client
│   │   ├── main.jsx          # App entry point
│   │   └── responsive.css    # Responsive styling
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml        # Local development
├── docker-compose-headless-quiz.yml  # Production (no build)
└── docker-build-quiz.sh      # Build & deploy script
```

## 🎯 How to Play

### As Game Master

1. Navigate to `/gm`
2. Select a question pack
3. Configure:
   - Seconds per question (5-120)
   - Number of questions
   - Theme
   - Public/Private room
4. Click "Create room" - note the room code
5. Wait for players to join
6. Click "Start game"
7. Click "Next" to advance through questions

### As Player

1. Navigate to `/play`
2. Enter your name and select an avatar
3. Either:
   - Browse public rooms and click to join
   - Switch to "Enter code" and type the room code
4. Wait for Game Master to start
5. Answer questions by clicking choices
6. First correct answer wins points!

### Scoring

- **Correct answer**: +10 points
- **Wrong answer**: -1 point
- **First to answer correctly**: Triggers reveal and wins the round

## 🔧 Configuration

### Server Environment Variables

```bash
PORT=8793  # Server port (default: 8793)
```

### Web Environment Variables

The web app automatically connects to `http://localhost:8793` in development.

For production, the Dockerized web app connects to the server container via service name.

## 🐛 Troubleshooting

### Players can't connect

- Check that both server and web are running
- Verify firewall allows ports 8792 and 8793
- On mobile, use the computer's IP address instead of localhost

### Theme not applying

- Clear browser cache
- Check that theme JSON is valid
- Verify theme name matches the filename (without .json)

### Raspberry Pi deployment fails

- Verify SSH access: `ssh pi@raspberrypi.local`
- Check Docker is installed: `docker --version`
- Ensure user is in docker group: `groups $USER`
- Check Pi has internet access for pulling images

### Screen goes to sleep during questions

- The wake lock feature should prevent this on supported browsers
- Supported: Chrome/Edge mobile, Safari iOS 16.4+, Firefox Android
- Fallback: Adjust device sleep settings

## 📄 License

MIT License - feel free to use this for educational purposes, parties, or any other fun activities!

## 🙏 Acknowledgments

Built with:
- React + Vite
- Socket.io
- Express
- Docker
- Canvas Confetti
- Love and chaos from a 9-year-old's birthday party

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new question packs
- Create new themes
- Improve responsive design
- Add new features
- Fix bugs

Submit a PR or open an issue!

## 📞 Support

For issues, questions, or suggestions, please open a GitHub issue.

---

**Have fun and happy quizzing! 🎉**
