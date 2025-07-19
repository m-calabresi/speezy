#!/bin/bash

# Exit on any error
set -e

# Validate input
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 v<MAJOR>.<MINOR>.<BUG>[-suffix]"
  exit 1
fi

VERSION="$1"

# Regex explanation:
# ^v              => must start with 'v'
# [0-9]+          => one or more digits (major)
# \.              => dot
# [0-9]+          => one or more digits (minor)
# \.              => dot
# [0-9]+          => one or more digits (bug)
# (-[a-zA-Z0-9]+)? => optional suffix prefixed by '-' and made of letters/numbers
if [[ ! "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$ ]]; then
  echo "Error: Invalid version format."
  echo "Expected: v<MAJOR>.<MINOR>.<BUG>[-suffix], e.g., v1.2.3 or v2.0.1-beta"
  exit 1
fi

# Check if in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: Not a git repository."
  exit 1
fi

# Create and push the tag
echo "✏️ Tagging version: $VERSION"
git tag "$VERSION"
git push origin "$VERSION"

echo "✅ Tag $VERSION pushed successfully."
