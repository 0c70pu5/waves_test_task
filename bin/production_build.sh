#!/usr/bin/env bash
# RUN FROM PROJECT ROOT
# THIS USING IN DEPLOY
export NODE_ENV=production
export WEBPACK_PUBLIC_PATH=/
export WEBPACK_PATH=$(readlink -m ./build)
export STATIC_RESOURCE_PATH=$(readlink -m ./static)
export WEB_PORT=3000
export NODE_BUNDLE_PATH=$(readlink -m ./build/bundle.node.js)

export API_URL=https://localhost:3000

node_modules/.bin/webpack -p --config ./webpack/webpack.config-prod.js
