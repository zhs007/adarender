const path = require('path');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './browser/index.js',
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
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
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
