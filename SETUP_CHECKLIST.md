# ✅ GGSD Setup Checklist

Use this checklist to get GGSD set up and pushed to GitHub.

---

## 📋 Phase 1: Local Setup

### Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Gemini API key obtained from https://aistudio.google.com/app/apikey
- [ ] GitHub account created

---

### Initial Setup
- [ ] Open terminal and navigate to the ggsd directory
  ```bash
  cd /Users/jaeebzzeen/Developer/ggsd
  ```

- [ ] Run the setup script
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```

- [ ] Verify npm dependencies installed
  ```bash
  npm list --depth=0
  ```
  Should show no errors

- [ ] Set Gemini API key
  ```bash
  export GEMINI_API_KEY='your-api-key-here'
  
  # Make it permanent (choose your shell):
  # For Zsh (macOS default):
  echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
  source ~/.zshrc
  
  # For Bash:
  echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.bashrc
  source ~/.bashrc
  ```

- [ ] Verify API key is set
  ```bash
  echo $GEMINI_API_KEY
  ```
  Should display your API key

- [ ] Link CLI globally
  ```bash
  npm link
  ```

- [ ] Test CLI installation
  ```bash
  ggsd --version
  ggsd help
  ```

---

## 🐙 Phase 2: GitHub Setup

### Create Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `ggsd`
- [ ] Description: `Gemini Get Shit Done - Spec-driven development workflow adapted from glittercowboy/get-shit-done`
- [ ] Visibility: Public ✅ (recommended)
- [ ] Do NOT initialize with README, .gitignore, or license (we have these)
- [ ] Click "Create repository"

### Connect Local Repo to GitHub
- [ ] Copy your GitHub username for the commands below
- [ ] Add remote (replace YOUR_USERNAME):
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/ggsd.git
  ```

- [ ] Verify remote is set:
  ```bash
  git remote -v
  ```
  Should show origin with your GitHub URL

- [ ] Check git status:
  ```bash
  git status
  ```

- [ ] If not initialized, initialize git:
  ```bash
  git init
  git add .
  git commit -m "feat: initial GGSD project structure

Gemini Get Shit Done - A spec-driven development workflow adapted for 
Google's Gemini API with MCP integration.

Adapted from Get Shit Done by TÂCHES (glittercowboy)
Original: https://github.com/glittercowboy/get-shit-done

Features:
- CLI framework with commander
- Gemini API client with retry logic  
- Prompt templates optimized for Gemini
- MCP server architecture (planned)
- Comprehensive documentation
- Quick start guide

License: MIT (same as original GSD)
Attribution: Original work by TÂCHES (glittercowboy)"
  ```

- [ ] Set main branch:
  ```bash
  git branch -M main
  ```

- [ ] Push to GitHub:
  ```bash
  git push -u origin main
  ```

- [ ] Visit your repo on GitHub to verify files are there:
  ```
  https://github.com/YOUR_USERNAME/ggsd
  ```

---

### Configure Repository

- [ ] Add topics (click gear icon next to "About"):
  - `gemini`
  - `google-ai`
  - `mcp`
  - `model-context-protocol`
  - `spec-driven-development`
  - `workflow-automation`
  - `cli`
  - `ai-tools`
  - `developer-tools`

- [ ] Update description (same gear icon):
  - Description: `Gemini Get Shit Done - Spec-driven development workflow. Adapted from glittercowboy/get-shit-done for Google's Gemini API.`
  - Check ✅ "Include in the home page"

---

### Add GitHub Files

- [ ] Create issue templates directory:
  ```bash
  mkdir -p .github/ISSUE_TEMPLATE
  ```

- [ ] Create bug report template (`.github/ISSUE_TEMPLATE/bug_report.md`):
  ```markdown
  ---
  name: Bug Report
  about: Report a bug in GGSD
  title: '[BUG] '
  labels: bug
  ---

  **Describe the bug**
  Clear description of the bug.

  **To Reproduce**
  1. Run command '...'
  2. See error

  **Expected behavior**
  What should happen.

  **Environment**
  - OS: [e.g. macOS 14.1]
  - Node: [e.g. 18.17.0]
  - GGSD version: [e.g. 0.1.0]

  **Error logs**
  ```
  Paste logs here
  ```
  ```

- [ ] Create feature request template (`.github/ISSUE_TEMPLATE/feature_request.md`):
  ```markdown
  ---
  name: Feature Request
  about: Suggest a feature
  title: '[FEATURE] '
  labels: enhancement
  ---

  **Problem**
  What problem are you solving?

  **Proposed Solution**
  How would this work?

  **Example Usage**
  ```bash
  ggsd new-feature --example
  ```

  **Alternatives**
  Other approaches considered.
  ```

- [ ] Create PR template (`.github/pull_request_template.md`):
  ```markdown
  ## Description
  Brief description of changes

  ## Type of Change
  - [ ] Bug fix
  - [ ] New feature
  - [ ] Documentation

  ## Checklist
  - [ ] Tests added/updated
  - [ ] Documentation updated
  - [ ] Attribution maintained
  - [ ] Conventional commit format

  ## Related Issues
  Closes #(issue number)
  ```

- [ ] Commit GitHub templates:
  ```bash
  git add .github/
  git commit -m "chore: add GitHub issue and PR templates"
  git push
  ```

---

### Update README with Your Username

- [ ] Edit README.md and replace `YOUR_USERNAME` with your actual GitHub username in these sections:
  - Repository links in badges
  - Installation instructions
  - Any other URLs

- [ ] Update package.json with your GitHub info:
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/ggsd.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/ggsd/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/ggsd#readme"
  ```

- [ ] Commit these changes:
  ```bash
  git add README.md package.json
  git commit -m "docs: update repository URLs with actual GitHub username"
  git push
  ```

---

### Star Original Repository

- [ ] Visit https://github.com/glittercowboy/get-shit-done
- [ ] Click the ⭐ Star button (to show appreciation!)

---

## 🎯 Phase 3: Verify Everything Works

### Local Verification
- [ ] Test CLI:
  ```bash
  ggsd --version
  ggsd help
  ```

- [ ] Check git status:
  ```bash
  git status
  ```
  Should show "working tree clean"

- [ ] Verify API key:
  ```bash
  echo $GEMINI_API_KEY
  ```
  Should show your key

### GitHub Verification
- [ ] Repository is public
- [ ] README displays correctly
- [ ] LICENSE shows attribution
- [ ] Topics are visible
- [ ] Description is set
- [ ] Issue templates work (create a test issue and delete it)

---

## 📚 Phase 4: Documentation Review

### Read These Now
- [ ] Read PROJECT_SUMMARY.md (overview of what we built)
- [ ] Read QUICKSTART.md (understand the workflow)
- [ ] Read ROADMAP.md (see what's next to implement)
- [ ] Skim ARCHITECTURE.md (understand the system)

### Bookmark These
- [ ] CONTRIBUTING.md (when you start coding)
- [ ] INSTALLATION.md (for troubleshooting)
- [ ] GITHUB.md (for GitHub workflows)
- [ ] docs/README.md (documentation index)

---

## 🚀 Phase 5: Next Steps

### Immediate (Do Today)
- [ ] Create first issue for `new-project` command:
  ```markdown
  Title: Implement new-project command
  
  **Description**
  Implement the new-project command as specified in ROADMAP.md
  
  **Acceptance Criteria**
  - [ ] Question flow with inquirer
  - [ ] Spawn research agents
  - [ ] Create PROJECT.md, REQUIREMENTS.md, ROADMAP.md
  - [ ] Initialize .planning/ structure
  - [ ] Tests added
  
  **Reference**
  - ROADMAP.md Phase 2, Command 1
  - src/gemini/prompts.js for prompt templates
  ```

- [ ] Create feature branch:
  ```bash
  git checkout -b feature/new-project-command
  ```

### This Week
- [ ] Implement new-project command
- [ ] Write tests for new-project
- [ ] Commit and push
- [ ] Create Pull Request

### Next 2 Weeks
- [ ] Implement discuss-phase
- [ ] Implement plan-phase
- [ ] Implement execute-phase
- [ ] Implement verify-work
- [ ] Implement progress

### Within a Month
- [ ] Complete MVP (6 core commands)
- [ ] Create example project
- [ ] Tag v0.1.0 release

---

## 🎨 Maintenance Checklist

### Every Commit
- [ ] Follows conventional commit format
- [ ] Maintains attribution to TÂCHES
- [ ] Tests pass (when we have tests)
- [ ] Documentation updated if needed

### Every PR
- [ ] Description explains changes
- [ ] Links to related issue
- [ ] Tests included
- [ ] No console.log() left in code

### Every Release
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated (create this file)
- [ ] Git tag created
- [ ] GitHub release created
- [ ] Attribution in release notes

---

## 📊 Progress Tracking

Mark your progress:

**Foundation** ✅
- [x] Project structure created
- [x] Documentation written
- [x] GitHub repository set up
- [x] Attribution maintained

**Core Commands** 🏗️
- [ ] new-project
- [ ] discuss-phase  
- [ ] plan-phase
- [ ] execute-phase
- [ ] verify-work
- [ ] progress

**MCP Servers** 📦
- [ ] files-server
- [ ] git-server
- [ ] state-server
- [ ] research-server

**Testing** 🧪
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests

**Release** 🚀
- [ ] v0.1.0 (MVP)
- [ ] v1.0 (Full release)
- [ ] npm publish

---

## 🆘 If You Get Stuck

### Common Issues

**Problem**: Command not found
- **Solution**: Run `npm link` again or use `npx ggsd`

**Problem**: Git push rejected
- **Solution**: `git pull origin main --rebase` then `git push`

**Problem**: API key not working
- **Solution**: Verify with `echo $GEMINI_API_KEY` and restart terminal

### Getting Help

- [ ] Check INSTALLATION.md troubleshooting section
- [ ] Search GitHub issues
- [ ] Read QUICKSTART.md for workflow examples
- [ ] Reference original GSD for patterns

### Resources

- **Original GSD**: https://github.com/glittercowboy/get-shit-done
- **Your Repo**: https://github.com/YOUR_USERNAME/ggsd
- **Gemini API**: https://ai.google.dev/
- **MCP Docs**: https://github.com/modelcontextprotocol

---

## ✨ You're Done!

When all boxes above are checked:
- ✅ GGSD is set up locally
- ✅ GitHub repository is live
- ✅ You understand the system
- ✅ You're ready to implement

**Next**: Start building the commands! 🚀

See ROADMAP.md Phase 2 for the implementation plan.

---

**Attribution**: GGSD adapted from Get Shit Done by TÂCHES (glittercowboy)  
**License**: MIT  
**Status**: Foundation Complete, Ready for Implementation

**Now go get shit done! 🎉**
