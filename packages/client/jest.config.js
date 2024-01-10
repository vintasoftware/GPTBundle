import base from '../../jest.config.base.js';

export default {
  ...base,
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['../../test-setup.ts'],
  setupFilesAfterEnv: ['../../test-setup-after-env.ts'],
};
