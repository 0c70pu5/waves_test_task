const React = require('react');
const renderToNodeStream = require('react-dom/server').renderToNodeStream;
const getRemoteModule = require('../helpers/get-remote-module');
const {
  NODE_ENV,
  NODE_BUNDLE_PATH
} = process.env;

module.exports = async function ({req, res, next}) {
  if (/.*__webpack_hmr/g.test(req.url)) {
    return next();
  }
  if (/\/build\//g.test(req.url)) {
    return next();
  }

  let Html = null;

  // get bundle (dev: from building server, prod: from file system)
  if (NODE_ENV === 'development') {
    try {
      const bundle = await getRemoteModule(NODE_BUNDLE_PATH);
      Html = bundle.Html;
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  } else if (NODE_ENV === 'production') {
    try {
      const bundle = require(NODE_BUNDLE_PATH).bundle;
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
    const vHtml = React.createElement(Html);

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
