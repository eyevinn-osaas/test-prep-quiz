# Testing & Quality Assurance

This project includes a comprehensive test harness to catch errors (like missing React imports) before they make it to production.

## 🧪 Test Coverage

The test harness includes:

1. **ESLint** - Catches syntax errors, missing imports, and code quality issues
2. **Build Verification** - Ensures the code compiles successfully
3. **Docker Build Tests** - Runs automatically during Docker builds
4. **Pre-commit Hooks** - Optional git hooks to test before commits

## 🚀 Quick Start

### Install Dependencies

```bash
cd web
npm install
```

### Run Tests Locally

**Option 1: Full test suite (recommended before pushing)**
```bash
./test.sh
```

**Option 2: Just lint the web code**
```bash
cd web
npm run lint
```

**Option 3: Lint + build**
```bash
cd web
npm test
```

**Option 4: Auto-fix linting issues**
```bash
cd web
npm run lint:fix
```

## 🪝 Git Hooks (Optional but Recommended)

To automatically run tests before each commit:

```bash
./setup-hooks.sh
```

This will:
- Copy the pre-commit hook to `.git/hooks/`
- Run ESLint on changed files before allowing commits
- Prevent commits with linting errors

To bypass the hook (not recommended):
```bash
git commit --no-verify
```

## 🐳 Docker Build Tests

The Docker build automatically runs linting before building:

```bash
docker build -f web/Dockerfile -t test-prep-web ./web
```

If linting fails, the build will fail. This ensures bad code never makes it into a Docker image.

## 📋 What Gets Checked

### ESLint Rules

- **Missing React imports** - Catches `ReferenceError: React is not defined`
- **Unused variables** - Warns about unused imports and variables
- **React Hooks rules** - Ensures hooks are used correctly
- **Prop types** - Warns about missing prop validation (optional)
- **Code style** - Ensures consistent formatting

### Common Errors Caught

✅ Missing `import React from "react"` in JSX files
✅ Unused imports
✅ Invalid hook usage
✅ Syntax errors
✅ Build failures

## 🛠️ Available NPM Scripts

In the `web/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint (fails on errors) |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm test` | Run lint + build (full test) |
| `npm run validate` | Same as `npm run lint` |

## 🔧 Configuration Files

- `web/.eslintrc.cjs` - ESLint configuration
- `web/.eslintignore` - Files to ignore during linting
- `web/vite.config.js` - Vite configuration with React plugin
- `hooks/pre-commit` - Git pre-commit hook
- `test.sh` - Full test suite script

## 🐛 Troubleshooting

### ESLint errors after pulling new code

```bash
cd web
npm install
npm run lint:fix
```

### Want to disable a specific rule?

Edit `web/.eslintrc.cjs` and set the rule to `'off'` or `'warn'`:

```javascript
rules: {
  'react/prop-types': 'off', // Disable prop-types warnings
}
```

### Pre-commit hook not working?

Make sure it's installed and executable:

```bash
./setup-hooks.sh
```

## 📚 Best Practices

1. **Always run tests before pushing:**
   ```bash
   ./test.sh
   ```

2. **Install git hooks on first clone:**
   ```bash
   ./setup-hooks.sh
   ```

3. **Fix linting errors immediately** - Don't disable rules unless absolutely necessary

4. **Use `npm run lint:fix`** to auto-fix common issues

5. **Check Docker builds locally** before pushing:
   ```bash
   docker build -f web/Dockerfile -t test-prep-web ./web
   ```

## 🎯 CI/CD Integration

The linting is integrated into:

- ✅ Docker builds (fails on lint errors)
- ✅ Local test script (`./test.sh`)
- ✅ Git pre-commit hooks (optional)

Future additions could include:
- GitHub Actions workflows
- Pre-push hooks
- Automated testing on pull requests

## ❓ FAQ

**Q: Can I commit without running tests?**
A: Yes, but not recommended. Use `git commit --no-verify`

**Q: Why does Docker build fail with lint errors?**
A: This is intentional! It prevents deploying broken code.

**Q: How do I add more ESLint rules?**
A: Edit `web/.eslintrc.cjs` and add rules to the `rules` object.

**Q: Can I disable ESLint in Docker builds?**
A: Yes, but strongly discouraged. Remove `RUN npm run lint` from `web/Dockerfile`.
