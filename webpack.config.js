const path = require('path');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './browser/adarender.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'adarender.js',
    libraryTarget: 'umd',
    library: 'adarender',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, './browser'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4,
      }),
    ],
  },
  externals: {
    echarts: 'echarts',
  },
};
