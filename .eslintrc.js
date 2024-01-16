module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'testing-library', '@typescript-eslint'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['**/examples/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['public', 'node_modules', 'dist', '.next'],
  rules: {
    'max-len': 'off',
    'import/no-relative-packages': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // forbid usage of unused variables (marked with an _)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['parameter', 'variable'],
        leadingUnderscore: 'forbid',
        filter: {
          // keep this one open for destructuring
          regex: '_*',
          match: false,
        },
        format: null,
      },
      {
        selector: 'parameter',
        leadingUnderscore: 'require',
        format: null,
        modifiers: ['unused'],
      },
    ],
  },
};
