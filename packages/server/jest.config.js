import base from '../../jest.config.base.js';

export default {
  ...base,
  testEnvironment: 'node',
  setupFiles: ['../../test-setup.js'],
  setupFilesAfterEnv: ['../../test-setup-after-env.js'],
};
