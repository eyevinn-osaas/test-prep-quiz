#!/bin/bash

# Setup git hooks to run tests before commits

echo "🪝 Setting up git hooks..."

# Make pre-commit hook executable
chmod +x hooks/pre-commit

# Copy to .git/hooks
cp hooks/pre-commit .git/hooks/pre-commit

echo "✅ Git hooks installed!"
echo ""
echo "The pre-commit hook will now run ESLint before each commit."
echo "To skip the hook (not recommended), use: git commit --no-verify"
