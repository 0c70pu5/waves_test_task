const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  NODE_ENV,
  WEBPACK_PUBLIC_PATH,
  WEBPACK_PATH,

  API_URL,
  GOOGLE_MAP_API_KEY
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
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /us/)
];

const config = {
  context: paths.src,
  mode: 'development',
  name: 'node',
  target: 'node',
  devtool: 'inline-source-map',
  entry: {
    bundle: entry
  },
  output: {
    filename: '[name].node.js',
    chunkFilename: '[name]-[id].node.bundle.js',
    publicPath: WEBPACK_PUBLIC_PATH,
    path: WEBPACK_PATH,
    library: '[name]',
    libraryTarget: 'var',
    hotUpdateChunkFilename: '[id].[hash].hot-update.node.js',
    hotUpdateMainFilename: '[hash].hot-update.node.json'
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
                localIdentName: '[local]--[hash:base64:10]'
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
