const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
  'whatwg-fetch',
  './client.js'
];

const plugins = [
  new webpack.DefinePlugin({
    'global.IS_BROWSER': true,
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL: JSON.stringify(API_URL),
      GOOGLE_MAP_API_KEY: JSON.stringify(GOOGLE_MAP_API_KEY)
    }
  }),
  new ExtractTextPlugin({
    filename: '[name].css',
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
  new UglifyJSPlugin({test: /\.test\.js$/i}),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|html)$/,
    threshold: 10240,
    minRatio: 0.8
  })
];

const config = {
  context: paths.src,
  mode: 'production',
  devtool: false,
  name: 'web',
  target: 'web',
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
    filename: '[name].js',
    chunkFilename: '[name]-[id].bundle.js',
    publicPath: WEBPACK_PUBLIC_PATH,
    path: WEBPACK_PATH,
    library: '[name]'
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
