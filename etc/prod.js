const path = require('path');

const baseEnv = {
  // Build variables
  NODE_ENV: 'production',
  WEBPACK_PUBLIC_PATH: '/',
  WEBPACK_PATH: path.join(__dirname, '..', 'build'),
  STATIC_RESOURCE_PATH: path.join(__dirname, '..', 'static'),
  WEB_PORT: 3000,
  NODE_BUNDLE_PATH: path.join(__dirname, '..', 'build/bundle.node.js'),

  // BL variables
  API_URL: 'http://localhost:3000',
  GOOGLE_MAP_API_KEY: 'AIzaSyA8MI95lxoYozcj3vny-M1ZYhq_DIozZUU'
};

module.exports = baseEnv;
