import base from '../../jest.config.base.js';

export default {
  ...base,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './packages/client/tsconfig.json',
      },
    ],
  },
  setupFiles: ['../../test-setup.ts'],
};
