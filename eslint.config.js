'use strict';

const hexoConfig = require('eslint-config-hexo/eslint');
const hexoTestConfig = require('eslint-config-hexo/test');
const testConfig = hexoTestConfig[hexoTestConfig.length - 1];

module.exports = [
  ...hexoConfig,
  {
    ...testConfig,
    files: ['test/**/*.js']
  }
];
