const {
  NODE_ENV,
  WEBPACK_PUBLIC_PATH,
  WEBPACK_PATH,
  STATIC_RESOURCE_PATH,
  WEB_PORT,
  DEV_BUILD_PORT,
  DEV_BUILD_HOST,
  NODE_BUNDLE_PATH,

  API_URL
} = process.env;

console.log('\n');
console.log('webpack development env:');
console.log(`NODE_ENV ->  ${NODE_ENV}`);
console.log(`WEBPACK_PUBLIC_PATH ->  ${WEBPACK_PUBLIC_PATH}`);
console.log(`WEBPACK_PATH ->  ${WEBPACK_PATH}`);
console.log(`STATIC_RESOURCE_PATH ->  ${STATIC_RESOURCE_PATH}`);
console.log(`WEB_PORT ->  ${WEB_PORT}`);
console.log(`DEV_BUILD_PORT ->  ${DEV_BUILD_PORT}`);
console.log(`DEV_BUILD_HOST ->  ${DEV_BUILD_HOST}`);
console.log(`NODE_BUNDLE_PATH ->  ${NODE_BUNDLE_PATH}`);
console.log(`API_URL ->  ${API_URL}`);
console.log('\n');

const nodeConfig = require('./dev/node.config');
const webConfig = require('./dev/web.config');

//Will create a bundle.js and bundle.node.js file in dist folder.
module.exports = [nodeConfig, webConfig];
