const React = require('react');
const renderToNodeStream = require('react-dom/server').renderToNodeStream;
const StaticRouter = require('react-router-dom/StaticRouter').default;
const Provider = require('react-redux').Provider;
const getRemoteModule = require('../helpers/get-remote-module');
const {
  NODE_ENV,
  NODE_BUNDLE_PATH
} = process.env;

module.exports = async function ({req, res, next}, initialData = {}) {
  if (/.*__webpack_hmr/g.test(req.url)) {
    return next();
  }
  if (/\/build\//g.test(req.url)) {
    return next();
  }

  let Root = null;
  let cachedStore = null;
  let Html = null;

  // get bundle (dev: from building server, prod: from file system)
  if (NODE_ENV === 'development') {
    try {
      const bundle = await getRemoteModule(NODE_BUNDLE_PATH);
      cachedStore = bundle.configureStore(initialData);
      Root = bundle.Root;
      Html = bundle.Html;
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  } else if (NODE_ENV === 'production') {
    try {
      const bundle = require(NODE_BUNDLE_PATH).bundle;
      cachedStore = bundle.configureStore(initialData);
      Root = bundle.Root;
      Html = bundle.Html;
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  } else {
    throw new Error(`Unknown NODE_ENV value ${NODE_ENV}`);
  }

  try {
    let context = {};
    const vHtml = React.createElement(
      Html,
      {initialData: JSON.stringify(initialData)},
      React.createElement(
        Provider,
        {store: cachedStore},
        React.createElement(
          StaticRouter,
          {location: req.url, context},
          React.createElement(Root, null)
        )
      )
    );

    if (context.status === 404) {
      res.sendStatus(404);
    }

    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.write('<!DOCTYPE html>');
    renderToNodeStream(vHtml).pipe(res);

  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
