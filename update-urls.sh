#!/bin/bash
# Script to replace YOUR_USERNAME with jaeebz and ggsd with GGSD in all markdown files

echo "Updating repository URLs in all documentation..."

# Use perl for in-place editing that works on macOS
find . -name "*.md" -type f -exec perl -pi -e 's/YOUR_USERNAME/jaeebz/g' {} \;
find . -name "*.md" -type f -exec perl -pi -e 's/github\.com\/jaeebz\/ggsd/github.com\/jaeebz\/GGSD/g' {} \;

echo "✅ All documentation files updated!"
echo ""
echo "Updated URLs:"
echo "  - Repository: https://github.com/jaeebz/GGSD"
echo "  - Issues: https://github.com/jaeebz/GGSD/issues"
echo "  - Homepage: https://github.com/jaeebz/GGSD#readme"
