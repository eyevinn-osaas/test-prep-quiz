module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    // With new JSX transform, React doesn't need to be in scope
    'react/react-in-jsx-scope': 'off',

    // Warn about missing prop types (helpful but not critical for this project)
    'react/prop-types': 'off', // Disabled for simplicity, could use TypeScript instead

    // Catch unused variables
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],

    // Empty catch blocks should at least have a comment
    'no-empty': ['error', { allowEmptyCatch: true }],

    // Ensure hooks are used correctly
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Refresh - components should be exported
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
