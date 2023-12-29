export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@next/next/recommended', 'mantine', 'prettier'],
  plugins: ['react', 'testing-library'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
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
