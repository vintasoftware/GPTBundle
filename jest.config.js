/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        // FIXME: Remove this from the root config file
        tsconfig: './packages/server/tsconfig.json',
      },
    ],
  },
  setupFiles: ['./test-setup.ts'],
};
