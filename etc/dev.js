const path = require('path');

const baseEnv = {
  // Build variables
  NODE_ENV: 'development',
  WEBPACK_PUBLIC_PATH: '/build/',
  WEBPACK_PATH: path.join(__dirname, '..', './tmp/'),
  STATIC_RESOURCE_PATH: path.join(__dirname, '../static'),
  WEB_PORT: 2018,
  DEV_BUILD_PORT: 3001,
  DEV_BUILD_HOST: 'localhost',
  NODE_BUNDLE_PATH: 'http://localhost:3001/build/bundle.node.js',

  // BL variables
  API_URL: 'http://localhost:3000',
  GOOGLE_MAP_API_KEY: 'AIzaSyA8MI95lxoYozcj3vny-M1ZYhq_DIozZUU'
};

module.exports = baseEnv;
