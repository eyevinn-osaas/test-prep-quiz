#!/bin/bash

# Test script to run before pushing
# This catches common errors like missing imports

set -e

echo "🧪 Running Test Harness..."
echo ""

# Test Web Frontend
echo "📦 Testing Web Frontend..."
cd web

echo "  ├─ Installing dependencies..."
npm install --quiet

echo "  ├─ Running ESLint..."
npm run lint

echo "  ├─ Running build test..."
npm run build

echo "  └─ ✅ Web tests passed!"
echo ""

cd ..

# Test Server (basic syntax check)
echo "🖥️  Testing Server..."
cd server

echo "  ├─ Installing dependencies..."
npm install --quiet

echo "  ├─ Checking for syntax errors..."
node --check index.js

echo "  └─ ✅ Server tests passed!"
echo ""

cd ..

echo "✨ All tests passed! Safe to push. 🚀"
