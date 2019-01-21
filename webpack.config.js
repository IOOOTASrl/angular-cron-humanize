const libName = require('./package.json').name;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    [libName]: './src/angular-cron-humanize.ts',
    [libName + '.min']: './src/angular-cron-humanize.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  mode: 'production',
  optimization:{
    minimizer: [
      new TerserPlugin({
        test: /\.min.js/i,
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  },
  externals: {
    angular: 'angular'
  }
};