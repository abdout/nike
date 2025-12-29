#!/bin/bash

# Pre-deployment Checklist Script
# Run this before deploying to production

set -e

echo "========================================"
echo "  Pre-deployment Checklist"
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

check_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ERRORS=$((ERRORS + 1))
}

check_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

# 1. Check git status
echo "1. Checking git status..."
if [[ $(git status --porcelain) ]]; then
    check_warn "Uncommitted changes found"
    git status --short
else
    check_pass "Git working tree is clean"
fi
echo ""

# 2. Check current branch
echo "2. Checking branch..."
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" == "main" ]]; then
    check_pass "On main branch"
else
    check_warn "Not on main branch (current: $CURRENT_BRANCH)"
fi
echo ""

# 3. Check for unpushed commits
echo "3. Checking for unpushed commits..."
UNPUSHED=$(git log origin/$CURRENT_BRANCH..HEAD --oneline 2>/dev/null | wc -l | tr -d ' ')
if [[ "$UNPUSHED" -gt 0 ]]; then
    check_warn "$UNPUSHED unpushed commit(s)"
else
    check_pass "All commits pushed"
fi
echo ""

# 4. TypeScript check
echo "4. Running TypeScript check..."
if pnpm tsc --noEmit 2>/dev/null; then
    check_pass "TypeScript check passed"
else
    check_fail "TypeScript errors found"
fi
echo ""

# 5. Lint check
echo "5. Running linter..."
if pnpm lint 2>/dev/null; then
    check_pass "Linting passed"
else
    check_fail "Lint errors found"
fi
echo ""

# 6. Build check
echo "6. Running production build..."
if pnpm build 2>/dev/null; then
    check_pass "Build successful"
else
    check_fail "Build failed"
fi
echo ""

# 7. Environment variables check
echo "7. Checking environment variables..."
REQUIRED_VARS=("DATABASE_URL" "BETTER_AUTH_SECRET" "BETTER_AUTH_URL")
for var in "${REQUIRED_VARS[@]}"; do
    if [[ -z "${!var}" ]]; then
        check_warn "Missing environment variable: $var"
    fi
done

# Check .env.local exists
if [[ -f ".env.local" ]]; then
    check_pass ".env.local file exists"
else
    check_warn ".env.local file not found"
fi
echo ""

# 8. Check for sensitive files
echo "8. Checking for sensitive files in git..."
SENSITIVE_FILES=(".env" ".env.local" ".env.production" "credentials.json" "*.pem")
for pattern in "${SENSITIVE_FILES[@]}"; do
    if git ls-files | grep -q "$pattern" 2>/dev/null; then
        check_fail "Sensitive file tracked in git: $pattern"
    fi
done
check_pass "No sensitive files in git"
echo ""

# 9. Check dependencies for vulnerabilities
echo "9. Checking for dependency vulnerabilities..."
if command -v pnpm &> /dev/null; then
    # pnpm audit returns exit code 1 if vulnerabilities found
    if pnpm audit --audit-level=high 2>/dev/null; then
        check_pass "No high/critical vulnerabilities"
    else
        check_warn "Vulnerabilities found (run 'pnpm audit' for details)"
    fi
fi
echo ""

# 10. Database migration status
echo "10. Checking database migrations..."
if [[ -d "drizzle" ]]; then
    MIGRATION_COUNT=$(ls -1 drizzle/*.sql 2>/dev/null | wc -l | tr -d ' ')
    check_pass "Found $MIGRATION_COUNT migration file(s)"
else
    check_warn "No drizzle migrations directory found"
fi
echo ""

# Summary
echo "========================================"
echo "  Summary"
echo "========================================"
if [[ $ERRORS -gt 0 ]]; then
    echo -e "${RED}FAILED: $ERRORS error(s), $WARNINGS warning(s)${NC}"
    echo ""
    echo "Fix the errors above before deploying."
    exit 1
elif [[ $WARNINGS -gt 0 ]]; then
    echo -e "${YELLOW}PASSED with $WARNINGS warning(s)${NC}"
    echo ""
    echo "Review warnings above. Proceed with caution."
    exit 0
else
    echo -e "${GREEN}ALL CHECKS PASSED${NC}"
    echo ""
    echo "Ready to deploy!"
    exit 0
fi
