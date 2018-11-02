const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  `webpack-hot-middleware/client?name=web`,
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
  new webpack.HotModuleReplacementPlugin(),
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
  new ManifestPlugin()
];

const config = {
  context: paths.src,
  mode: 'development',
  name: 'web',
  target: 'web',
  devtool: 'source-map',
  entry: {
    bundle: entry
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]-[id].bundle.js',
    publicPath: WEBPACK_PUBLIC_PATH,
    path: WEBPACK_PATH,
    library: '[name]',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json'
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
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
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
        }))
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl']
  },
  plugins: plugins
};

module.exports = config;
