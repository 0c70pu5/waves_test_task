const logger = require('morgan');
const proxy = require('http-proxy-middleware');
const ssr = require('./middleware/ssr');
const spa = require('./middleware/spa');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');

function appCreator({
                      NODE_ENV,
                      WEB_PORT,
                      DEV_BUILD_PORT,
                      DEV_BUILD_HOST,
                      WEBPACK_PATH,
                      STATIC_RESOURCE_PATH
                    }) {
  const app = express();

  app.set('port', WEB_PORT);
  app.disable('x-powered-by');

  if (NODE_ENV === 'development') {
    app.use(logger('dev'));
  } else {
    app.use(logger('common'));
  }

  app.use(bodyParser.json());
  app.use('/static', express.static(STATIC_RESOURCE_PATH));

  if (NODE_ENV === 'development') {
    app.use([
      '/favicon.ico',
      '/build/**',
      '**__webpack_hmr**',
      '**hot-update**'
    ], proxy({
      target: `http://${DEV_BUILD_HOST}:${DEV_BUILD_PORT}`,
      changeOrigin: true,
      ws: true
    }));
  } else if (NODE_ENV === 'production') {
    app.use(compression());
    app.use('/build', express.static(WEBPACK_PATH));
  } else {
    throw new Error(`Unknown NODE_ENV value ${NODE_ENV}`);
  }

  // app.use((req, res, next) => ssr({req, res, next}, {}));
  app.use((req, res, next) => spa({req, res, next}, {}));

  return app;
}

module.exports = appCreator;

