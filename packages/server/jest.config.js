import base from '../../jest.config.base.js';

export default {
  ...base,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './packages/server/tsconfig.json',
      },
    ],
  },
  setupFiles: ['../../test-setup.ts'],
};
