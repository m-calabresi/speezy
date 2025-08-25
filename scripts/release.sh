#!/bin/bash

# Usage example:
# $ bash scripts/release.sh v1.2.3-alpha.1

# Exit on any error
set -e

# Validate input
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 v<MAJOR>.<MINOR>.<BUG>[-suffix]"
  exit 1
fi

VERSION="$1"

# Regex explanation:
# ^v                          => must start with 'v'
# [0-9]+                      => one or more digits (major version)
# \.                          => dot
# [0-9]+                      => one or more digits (minor version)
# \.                          => dot
# [0-9]+                      => one or more digits (patch version)
# (-[a-zA-Z]+(\.[0-9]+)?)?    => optional suffix:
#                                - starts with "-"
#                                - followed by letters only (e.g., alpha, beta)
#                                - optional: a dot followed by digits (e.g., .1)
# $                           => end of string
if [[ ! "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z]+(\.[0-9]+)?)?$ ]]; then
  echo "Error: Invalid version format."
  echo "Expected format:"
  echo "  - v<MAJOR>.<MINOR>.<PATCH>"
  echo "  - Optional suffix: -alpha, -beta.1, etc."
  echo "Examples:"
  echo "  ✔ v1.2.3"
  echo "  ✔ v1.2.3-alpha"
  echo "  ✔ v1.2.3-alpha.1"
  echo "  ✖ v1.2.3-"
  echo "  ✖ v1.2.3-alpha."
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
