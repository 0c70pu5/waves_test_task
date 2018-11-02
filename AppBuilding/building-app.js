const logger = require('morgan');
const webpack = require('webpack');
const express = require('express');

const corsOptions = {
  origin: '*',
  methods: '*',
};

function appCreator({
                      WEBPACK_PUBLIC_PATH,
                      WEBPACK_PATH,
                      DEV_BUILD_PORT
                    }) {
  const app = express();

  const webpackConfig = require('../webpack/webpack.config-dev');
  const compiler = webpack(webpackConfig);
  const devMiddlewareOptions = {
    publicPath: WEBPACK_PUBLIC_PATH,
    hot: true,
    noInfo: false,
    reload: true,
    index: 'index.html',
    stats: {
      all: false,
      colors: true,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      assets: true
    },
    serverSideRender: true
  };
  const hotMiddlewareOptions = {
    path: '/__webpack_hmr',
    name: 'web'
  };

  app.set('port', DEV_BUILD_PORT);
  app.disable('x-powered-by');

  app.use(require('cors')(corsOptions));
  app.use(require('webpack-dev-middleware')(compiler, devMiddlewareOptions));
  app.use(require('webpack-hot-middleware')(compiler, hotMiddlewareOptions));

  app.use(logger('dev'));
  app.use(express.static(WEBPACK_PATH));
  app.get('/', function(req, res) {
    res.send('Build server');
  });

  return app;
}

module.exports = appCreator;
