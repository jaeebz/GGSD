# Setting Up GGSD on GitHub

Complete guide to getting your GGSD project on GitHub with proper attribution to the original GSD project.

---

## Step 1: Create GitHub Repository

### Via GitHub Website

1. **Go to GitHub**: https://github.com/new

2. **Repository Details**:
   - **Name**: `ggsd`
   - **Description**: `Gemini Get Shit Done - Spec-driven development workflow adapted from glittercowboy/get-shit-done`
   - **Visibility**: ✅ Public (recommended for open source)
   - **Initialize**: ⬜ Don't check any boxes (we already have files)

3. **Click**: "Create repository"

### Via GitHub CLI (gh)

```bash
# Install gh if you haven't: https://cli.github.com/
gh auth login

gh repo create ggsd \
  --public \
  --description "Gemini Get Shit Done - Spec-driven development workflow" \
  --source=. \
  --remote=origin
```

---

## Step 2: Connect Local Repository

After creating the GitHub repo, you'll see instructions. Here's what to do:

```bash
# Make sure you're in the ggsd directory
cd /Users/jaeebzzeen/Developer/ggsd

# Add GitHub as remote (replace jaeebz)
git remote add origin https://github.com/jaeebz/GGSD.git

# Verify remote is set
git remote -v

# You should see:
# origin  https://github.com/jaeebz/GGSD.git (fetch)
# origin  https://github.com/jaeebz/GGSD.git (push)
```

---

## Step 3: Prepare Initial Commit

Let's make sure everything is ready to push:

```bash
# Check git status
git status

# If you haven't initialized git yet:
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
- Complete documentation
- Quick start guide

License: MIT (same as original GSD)
Attribution: Original work by TÂCHES (glittercowboy)"
```

---

## Step 4: Push to GitHub

```bash
# Set main as default branch
git branch -M main

# Push to GitHub
git push -u origin main

# You should see:
# Enumerating objects: XX, done.
# Counting objects: 100% (XX/XX), done.
# ...
# To https://github.com/jaeebz/GGSD.git
#  * [new branch]      main -> main
```

---

## Step 5: Update Repository Settings

### Add Topics (Keywords)

1. Go to your repo: `https://github.com/jaeebz/GGSD`
2. Click the ⚙️ gear icon next to "About"
3. Add topics:
   - `gemini`
   - `google-ai`
   - `mcp`
   - `model-context-protocol`
   - `spec-driven-development`
   - `workflow-automation`
   - `cli`
   - `ai-tools`
   - `developer-tools`

### Update Description

In the same "About" section:
- **Description**: `Gemini Get Shit Done - Spec-driven development workflow. Adapted from glittercowboy/get-shit-done for Google's Gemini API.`
- **Website**: (Optional) Add if you have docs hosted
- **Check**: ✅ Include in the home page

---

## Step 6: Create Essential GitHub Files

### Issue Templates

Create `.github/ISSUE_TEMPLATE/`:

```bash
mkdir -p .github/ISSUE_TEMPLATE
```

**Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.md`):

```markdown
---
name: Bug Report
about: Report a bug in GGSD
title: '[BUG] '
labels: bug
---

**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
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
Paste error logs here
```

**Additional context**
Any other relevant info.
```

**Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.md`):

```markdown
---
name: Feature Request
about: Suggest a feature for GGSD
title: '[FEATURE] '
labels: enhancement
---

**Problem**
What problem are you trying to solve?

**Proposed Solution**
How would this feature work?

**Example Usage**
```bash
# Show what the usage would look like
ggsd new-feature --example
```

**Alternatives Considered**
What other approaches did you think about?

**Additional Context**
Any other relevant info.
```

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Testing

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Attribution maintained
- [ ] Conventional commit format
- [ ] Code follows style guidelines

## Related Issues
Closes #(issue number)

## Testing
How has this been tested?

## Attribution
- [ ] Original GSD attribution maintained
- [ ] New contributions properly documented
```

### Commit these templates:

```bash
git add .github/
git commit -m "chore: add GitHub issue and PR templates"
git push
```

---

## Step 7: Set Up GitHub Actions (Optional)

Create `.github/workflows/test.yml` for CI:

```yaml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
      env:
        GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

**Note**: You'll need to add `GEMINI_API_KEY` to your GitHub Secrets:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GEMINI_API_KEY`
4. Value: Your test API key

```bash
git add .github/workflows/
git commit -m "ci: add GitHub Actions workflow for testing"
git push
```

---

## Step 8: Add Badges to README

Update the top of your `README.md` with badges:

```markdown
# GGSD (Gemini Get Shit Done)

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/jaeebz/ggsd?style=for-the-badge)](https://github.com/jaeebz/GGSD/stargazers)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Tests](https://img.shields.io/github/actions/workflow/status/jaeebz/ggsd/test.yml?branch=main&style=for-the-badge&label=tests)](https://github.com/jaeebz/GGSD/actions)

**A spec-driven development workflow system adapted for Google's Gemini CLI with MCP integration**
```

Replace `jaeebz` with your actual GitHub username.

```bash
git add README.md
git commit -m "docs: add badges to README"
git push
```

---

## Step 9: Link to Original GSD Project

### Add to README

Make sure your README prominently features the attribution (already done in our README):

```markdown
## 🌟 Attribution

GGSD is an adaptation of the excellent [Get Shit Done](https://github.com/glittercowboy/get-shit-done) by [TÂCHES (glittercowboy)](https://github.com/glittercowboy).

**Original Project:** https://github.com/glittercowboy/get-shit-done  
**Original Author:** TÂCHES (glittercowboy)  
**Original License:** MIT
```

### Fork Relationship (Optional but Recommended)

If you want GitHub to show the fork relationship:

1. **Star the original repo**: https://github.com/glittercowboy/get-shit-done ⭐
2. **Reference in description**: Already done
3. **Link in docs**: Already done

**Note**: Since we're doing a significant reimplementation (not just a fork), we created a standalone repo. This is appropriate and GitHub understands this pattern.

---

## Step 10: Create First Release

Once you have working code:

```bash
# Tag the release
git tag -a v0.1.0 -m "Release v0.1.0: Initial GGSD implementation

Features:
- Core CLI framework
- Gemini API integration
- Prompt templates
- Documentation
- Attribution to original GSD

This is the initial release with the foundation for the GGSD workflow.
Work in progress - core commands still being implemented.

See QUICKSTART.md for usage."

# Push the tag
git push origin v0.1.0
```

Then on GitHub:
1. Go to Releases → "Create a new release"
2. Choose tag: `v0.1.0`
3. Title: "v0.1.0 - Initial Release"
4. Description: Copy from tag message
5. Click "Publish release"

---

## Step 11: Set Up Project Board (Optional)

Track development progress:

1. Go to your repo → Projects → "New project"
2. Choose "Board" template
3. Name: "GGSD Development"
4. Add columns:
   - 📋 To Do
   - 🏗️ In Progress
   - 👀 Review
   - ✅ Done

5. Add cards for each command to implement:
   - new-project
   - discuss-phase
   - plan-phase
   - execute-phase
   - verify-work
   - (etc.)

---

## Step 12: Invite Collaboration

### Enable Discussions

1. Go to Settings → Features
2. Check ✅ "Discussions"
3. Set up categories:
   - 💡 Ideas
   - 🙏 Q&A
   - 📣 Announcements
   - 🛠️ Development

### Create CONTRIBUTORS.md

```markdown
# Contributors

## Original Author

**Get Shit Done** was created by:
- **TÂCHES (glittercowboy)** - [GitHub](https://github.com/glittercowboy)

## GGSD Adaptation

**Gemini adaptation and MCP integration:**
- **[Your Name]** - [GitHub](https://github.com/jaeebz)

## Contributors

<!-- Add contributors as they join -->

---

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)
```

```bash
git add CONTRIBUTORS.md
git commit -m "docs: add contributors file"
git push
```

---

## Step 13: Publish to npm (When Ready)

When you have a working version:

### 1. Update package.json

```json
{
  "name": "ggsd-cli",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/jaeebz/GGSD.git"
  },
  "bugs": {
    "url": "https://github.com/jaeebz/GGSD/issues"
  },
  "homepage": "https://github.com/jaeebz/GGSD#readme"
}
```

### 2. Create npm account

```bash
npm adduser
```

### 3. Publish

```bash
npm publish
```

Now users can install with:
```bash
npx ggsd-cli new-project
```

---

## Ongoing Maintenance

### Regular Updates

```bash
# Pull latest from GitHub
git pull origin main

# Make changes...

# Commit
git add .
git commit -m "feat(commands): implement execute-phase"

# Push
git push
```

### Release Workflow

For new versions:

```bash
# Update version in package.json
npm version patch  # or minor, or major

# This creates a tag and commits

# Push everything
git push && git push --tags

# Create GitHub release
# Publish to npm if published
npm publish
```

---

## Best Practices

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix a bug
docs: update documentation
chore: maintenance task
test: add tests
refactor: code refactoring
```

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-project-command

# Work on it
# ...

# Push to GitHub
git push -u origin feature/new-project-command

# Create PR on GitHub
# Merge when approved
# Delete branch
git branch -d feature/new-project-command
```

### Keep Attribution Visible

In every commit, file, and release:
- Reference original GSD
- Link to glittercowboy/get-shit-done
- Maintain MIT license
- Credit TÂCHES

---

## Troubleshooting GitHub Issues

### Authentication Failed

```bash
# If using HTTPS and password fails, use personal access token:
# 1. GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token with 'repo' scope
# 3. Use token as password

# Or switch to SSH:
git remote set-url origin git@github.com:jaeebz/ggsd.git
```

### Push Rejected

```bash
# Pull first
git pull origin main --rebase

# Then push
git push
```

### Large Files Error

```bash
# If you accidentally committed large files:
git rm --cached large-file.bin
echo "large-file.bin" >> .gitignore
git commit -m "chore: remove large file"
```

---

## Next Steps

1. **⭐ Star the original GSD**: https://github.com/glittercowboy/get-shit-done
2. **📝 Start implementing**: Begin with core commands
3. **🧪 Add tests**: As you implement features
4. **📚 Update docs**: Keep documentation in sync
5. **🎉 Share progress**: Post updates, get feedback

---

## Resources

- **GitHub Docs**: https://docs.github.com/
- **GitHub CLI**: https://cli.github.com/
- **Git Tutorial**: https://git-scm.com/docs/gittutorial
- **Original GSD**: https://github.com/glittercowboy/get-shit-done

---

**Ready to share GGSD with the world! 🚀**

Remember: Always maintain attribution to TÂCHES and the original Get Shit Done project. This project builds on their excellent work.
