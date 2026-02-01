#!/bin/bash

# GGSD Quick Start Script
# Sets up the project for first-time development

set -e

echo "🚀 GGSD Quick Start"
echo "===================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. You have: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check for Gemini API key
echo "🔑 Checking for Gemini API key..."
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY not set"
    echo ""
    echo "To get an API key:"
    echo "1. Visit: https://aistudio.google.com/app/apikey"
    echo "2. Create a new API key"
    echo "3. Add to your shell profile:"
    echo "   export GEMINI_API_KEY='your-key-here'"
    echo ""
    read -p "Do you want to enter your API key now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your Gemini API key: " API_KEY
        echo "export GEMINI_API_KEY='$API_KEY'" >> ~/.bashrc
        echo "export GEMINI_API_KEY='$API_KEY'" >> ~/.zshrc
        export GEMINI_API_KEY="$API_KEY"
        echo "✅ API key set (restart your shell or run: source ~/.bashrc)"
    fi
else
    echo "✅ GEMINI_API_KEY is set"
fi
echo ""

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "feat: initial GGSD project structure

Adapted from glittercowboy/get-shit-done for Gemini ecosystem.

Features:
- CLI framework with commander
- Gemini API client with retry logic
- Prompt templates optimized for Gemini
- MCP server architecture
- Complete documentation

Attribution: Original work by TÂCHES (glittercowboy)
https://github.com/glittercowboy/get-shit-done
License: MIT"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi
echo ""

# Create GitHub repository reminder
echo "📢 Next Steps:"
echo ""
echo "1. Create GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name: ggsd"
echo "   - Description: Gemini Get Shit Done - Spec-driven development"
echo "   - Public repo"
echo "   - Don't initialize with README (we have one)"
echo ""
echo "2. Connect to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/ggsd.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Start development:"
echo "   - Read: README.md"
echo "   - Architecture: docs/ARCHITECTURE.md"
echo "   - Roadmap: Implementation plan in artifacts"
echo ""
echo "4. First task: Implement new-project command"
echo "   git checkout -b feature/new-project-command"
echo "   # Edit src/commands/new-project.js"
echo "   npm test"
echo "   git commit -m 'feat(commands): implement new-project'"
echo ""
echo "✨ Setup complete! Ready to build GGSD."
echo ""
echo "Attribution: Adapted from Get Shit Done by TÂCHES (glittercowboy)"
echo "Original: https://github.com/glittercowboy/get-shit-done"
