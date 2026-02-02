# Installation Checklist

Complete step-by-step installation and verification guide for GGSD.

---

## ✅ Pre-Installation Checklist

Before you begin, make sure you have:

- [ ] **Node.js 18+** installed
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
  If not: Download from https://nodejs.org/

- [ ] **npm** (comes with Node.js)
  ```bash
  npm --version  # Should show 8.x.x or higher
  ```

- [ ] **Git** installed
  ```bash
  git --version  # Should show 2.x.x or higher
  ```
  If not: Download from https://git-scm.com/

- [ ] **Gemini API Key** from Google AI Studio
  - Get one here: https://aistudio.google.com/app/apikey
  - Save it somewhere safe

- [ ] **Terminal** access
  - Mac/Linux: Terminal app
  - Windows: PowerShell or Git Bash

---

## 📦 Installation Methods

Choose your preferred method:

### Method 1: Quick Start (Recommended for First Time)

```bash
# 1. Clone the repository
git clone https://github.com/jaeebz/GGSD.git

# 2. Navigate to directory
cd ggsd

# 3. Run setup script
chmod +x setup.sh
./setup.sh
```

The setup script will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Prompt for API key
- ✅ Initialize git
- ✅ Show next steps

**That's it!** Skip to [Verification](#verification).

---

### Method 2: Manual Installation

If you prefer manual control:

#### Step 1: Clone Repository

```bash
git clone https://github.com/jaeebz/GGSD.git
cd ggsd
```

#### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- @google/generative-ai (Gemini SDK)
- @modelcontextprotocol/sdk (MCP)
- commander (CLI framework)
- inquirer (Interactive prompts)
- chalk (Terminal colors)
- ora (Spinners)
- zod (Validation)

#### Step 3: Set Gemini API Key

**Option A: Environment Variable (Temporary)**

```bash
export GEMINI_API_KEY='your-api-key-here'
```

This works for current terminal session only.

**Option B: Shell Profile (Permanent - Recommended)**

For Bash:
```bash
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

For Zsh (macOS default):
```bash
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

**Option C: .env File (Project-specific)**

```bash
# Create .env file
echo 'GEMINI_API_KEY=your-api-key-here' > .env

# The .gitignore already excludes .env files
```

Note: You'll need to load this with a package like `dotenv` if using this method.

#### Step 4: Link CLI Globally

```bash
npm link
```

Now `ggsd` command is available system-wide.

---

### Method 3: Development Installation

For contributing to GGSD:

```bash
# 1. Fork the repository on GitHub

# 2. Clone YOUR fork
git clone https://github.com/jaeebz/GGSD.git
cd ggsd

# 3. Add upstream remote (original repo)
git remote add upstream https://github.com/ORIGINAL_OWNER/ggsd.git

# 4. Install dependencies
npm install

# 5. Set up API key
export GEMINI_API_KEY='your-key'

# 6. Link for development
npm link

# 7. Create a feature branch
git checkout -b feature/my-feature
```

---

## 🔍 Verification

After installation, verify everything works:

### 1. Check CLI Installation

```bash
ggsd --version
```

**Expected output**:
```
0.1.0
```

### 2. Check API Key

```bash
echo $GEMINI_API_KEY
```

**Expected output**: Your API key (should not be empty)

### 3. Test Help Command

```bash
ggsd help
```

**Expected output**: List of all commands

### 4. Check Dependencies

```bash
npm list --depth=0
```

**Expected output**: All packages installed (no errors)

### 5. Test Gemini Connection

```bash
npm run test-gemini
```

**Expected output**: 
```
✅ Gemini API connection successful
Model: gemini-2.0-flash-exp
```

Note: This test command will be implemented in Phase 2.

---

## 🛠️ Post-Installation Setup

### 1. Create Your First Project

```bash
# Create a test directory
mkdir ~/ggsd-test
cd ~/ggsd-test

# Initialize a project
ggsd new-project
```

**What to expect**:
- Interactive questions about your project
- Option to research the domain
- Generation of .planning/ directory
- Creation of PROJECT.md, REQUIREMENTS.md, ROADMAP.md

### 2. Explore the Files

```bash
# See what was created
tree .planning/
# or
ls -la .planning/

# Read your project file
cat .planning/PROJECT.md
```

### 3. Check Progress

```bash
ggsd progress
```

**Expected output**:
```
📋 Project: Your Project Name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Status: Planning
Milestone: v1.0

Roadmap:
  Phase 1: Description  [PENDING]
  Phase 2: Description  [PENDING]
  ...

Next: ggsd discuss-phase 1
```

---

## 🔧 Configuration

### Optional Configurations

#### 1. Default Model Selection

Edit `src/gemini/client.js` to change default models:

```javascript
export const MODELS = {
  RESEARCH: 'gemini-2.0-flash-exp',      // Fast research
  PLANNING: 'gemini-exp-1206',           // Deep reasoning
  EXECUTION: 'gemini-exp-1206',          // Code generation
  VERIFICATION: 'gemini-2.0-flash-exp',  // Quick checks
  DEBUGGING: 'gemini-exp-1206'           // Complex diagnosis
};
```

#### 2. Retry Configuration

Edit `src/gemini/client.js` for retry behavior:

```javascript
const RETRY_CONFIG = {
  maxRetries: 3,              // Number of retries
  initialDelay: 1000,         // Initial delay (ms)
  maxDelay: 10000,            // Max delay (ms)
  backoffMultiplier: 2        // Exponential backoff
};
```

#### 3. File Size Limits

Edit `src/utils/file-ops.js` (when created) for size limits:

```javascript
const SIZE_LIMITS = {
  'PROJECT.md': 2048,         // 2KB
  'REQUIREMENTS.md': 5120,    // 5KB
  'ROADMAP.md': 3072,         // 3KB
  'STATE.md': 2048,           // 2KB
  'CONTEXT.md': 4096,         // 4KB
  'PLAN.md': 3072,            // 3KB
  'SUMMARY.md': 2048          // 2KB
};
```

---

## 🐛 Troubleshooting

### Issue: "command not found: ggsd"

**Cause**: npm link didn't work or PATH issue

**Solutions**:

1. Try relinking:
   ```bash
   cd /path/to/ggsd
   npm unlink
   npm link
   ```

2. Or use npx (no linking needed):
   ```bash
   npx ggsd new-project
   ```

3. Check npm global bin location:
   ```bash
   npm config get prefix
   # Should be in your PATH
   ```

---

### Issue: "GEMINI_API_KEY not set"

**Cause**: API key not configured

**Solutions**:

1. Set for current session:
   ```bash
   export GEMINI_API_KEY='your-key'
   ```

2. Add to shell profile:
   ```bash
   # Bash
   echo 'export GEMINI_API_KEY="your-key"' >> ~/.bashrc
   source ~/.bashrc
   
   # Zsh
   echo 'export GEMINI_API_KEY="your-key"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. Verify it's set:
   ```bash
   echo $GEMINI_API_KEY
   ```

---

### Issue: "npm install" fails

**Cause**: Node version too old or network issues

**Solutions**:

1. Check Node version:
   ```bash
   node --version
   # Should be 18.x.x or higher
   ```

2. Update Node.js:
   - Download from https://nodejs.org/
   - Or use nvm:
     ```bash
     nvm install 18
     nvm use 18
     ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

4. Try with different registry:
   ```bash
   npm install --registry=https://registry.npmjs.org/
   ```

---

### Issue: "Rate limit exceeded"

**Cause**: Too many Gemini API calls

**Solutions**:

1. Wait 60 seconds and try again (auto-retry should handle this)

2. Check your API quota:
   - Go to: https://aistudio.google.com/app/apikey
   - View your quota and usage

3. Use free tier wisely:
   - Free tier: 60 requests per minute
   - Pro tier: More quota available

---

### Issue: Tests failing

**Cause**: API key not set or network issues

**Solutions**:

1. Ensure API key is set:
   ```bash
   echo $GEMINI_API_KEY
   ```

2. Run specific test:
   ```bash
   node tests/unit/client.test.js
   ```

3. Check network:
   ```bash
   ping google.com
   ```

---

### Issue: Permission denied on setup.sh

**Cause**: Script not executable

**Solution**:

```bash
chmod +x setup.sh
./setup.sh
```

---

### Issue: Git errors

**Cause**: Git not initialized or wrong remote

**Solutions**:

1. Initialize git:
   ```bash
   git init
   ```

2. Check remotes:
   ```bash
   git remote -v
   ```

3. Fix remote URL:
   ```bash
   git remote set-url origin https://github.com/jaeebz/GGSD.git
   ```

---

## 📱 Platform-Specific Notes

### macOS

- **Terminal**: Use Terminal.app or iTerm2
- **Shell**: Default is zsh (use ~/.zshrc)
- **Package Manager**: Can use Homebrew
  ```bash
  brew install node
  ```

### Linux

- **Terminal**: Use your preferred terminal
- **Shell**: Usually bash (use ~/.bashrc)
- **Package Manager**: Use apt, yum, dnf, etc.
  ```bash
  # Ubuntu/Debian
  sudo apt update
  sudo apt install nodejs npm
  
  # Fedora
  sudo dnf install nodejs npm
  ```

### Windows

- **Terminal**: Use PowerShell or Git Bash (recommended)
- **Node.js**: Download installer from nodejs.org
- **Environment Variables**:
  1. Win + R → "sysdm.cpl" → Advanced → Environment Variables
  2. Add GEMINI_API_KEY under User variables
  3. Restart terminal

- **npm link issues**:
  - May need to run PowerShell as Administrator
  - Or use npx instead

---

## ✨ Update to Latest Version

To update GGSD in the future:

```bash
# Navigate to GGSD directory
cd /path/to/ggsd

# Pull latest changes
git pull origin main

# Reinstall dependencies (if package.json changed)
npm install

# Relink if needed
npm link
```

---

## 🗑️ Uninstallation

If you need to uninstall:

### 1. Unlink CLI

```bash
cd /path/to/ggsd
npm unlink
```

### 2. Remove Directory

```bash
rm -rf /path/to/ggsd
```

### 3. Remove API Key (Optional)

Edit ~/.bashrc or ~/.zshrc and remove the GEMINI_API_KEY line.

### 4. Clear npm Cache (Optional)

```bash
npm cache clean --force
```

---

## 📚 Next Steps

After successful installation:

1. **Read**: [QUICKSTART.md](QUICKSTART.md) - Learn the workflow
2. **Try**: Build a simple project
3. **Explore**: [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Understand how it works
4. **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md) - Help improve GGSD

---

## 🆘 Still Having Issues?

- **GitHub Issues**: https://github.com/jaeebz/GGSD/issues
- **Discussions**: https://github.com/jaeebz/GGSD/discussions
- **Original GSD**: https://github.com/glittercowboy/get-shit-done

---

## ✅ Final Checklist

Before you start using GGSD, verify:

- [ ] `ggsd --version` works
- [ ] `echo $GEMINI_API_KEY` shows your key
- [ ] `ggsd help` displays commands
- [ ] npm dependencies installed (no errors)
- [ ] Can create test project successfully

**All checked?** You're ready to get shit done with Gemini! 🚀

---

**Attribution**: GGSD adapted from [Get Shit Done](https://github.com/glittercowboy/get-shit-done) by TÂCHES (glittercowboy). License: MIT.
