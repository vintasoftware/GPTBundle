import base from '../../jest.config.base.js';

export default {
  ...base,
  name: 'server',
  testEnvironment: 'node',
  setupFiles: ['../../test-setup.ts'],
  setupFilesAfterEnv: ['../../test-setup-after-env.ts'],
};
