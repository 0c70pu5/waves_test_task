const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const {
  NODE_ENV,
  WEBPACK_PUBLIC_PATH,
  WEBPACK_PATH,

  GOOGLE_MAP_API_KEY,
  API_URL
} = process.env;


const paths = {
  src: path.join(__dirname, '../../client')
};

const entry = [
  './client.js'
];

const plugins = [
  new webpack.DefinePlugin({
    'global.IS_BROWSER': false,
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL: JSON.stringify(API_URL),
      GOOGLE_MAP_API_KEY: JSON.stringify(GOOGLE_MAP_API_KEY)
    }
  }),
  new ExtractTextPlugin({
    filename: '[name].node.css',
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.styl$/,
    stylus: {
      default: {
        import: [path.join(__dirname, '../../client/theme/core/index.styl')],
        preferPathResolver: 'webpack'
      }
    }
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /us/),
  new MinifyPlugin({removeDebugger: true, topLevel: true}, {test: /\.test\.js$/i}),
  new UglifyJSPlugin({test: /\.test\.js$/i})
];

const config = {
  context: paths.src,
  mode: 'production',
  name: 'node',
  devtool: false,
  target: 'node',
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: false,
    assets: true
  },
  entry: {
    bundle: entry
  },
  output: {
    filename: '[name].node.js',
    chunkFilename: '[name]-[id].node.bundle.js',
    publicPath: WEBPACK_PUBLIC_PATH,
    path: WEBPACK_PATH,
    library: '[name]',
    libraryTarget: 'commonjs',
    hotUpdateChunkFilename: '[id].[hash].node.hot-update.js',
    hotUpdateMainFilename: '[hash].node.hot-update.json'
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                minimize: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl']
  },
  plugins: plugins
};

module.exports = config;
