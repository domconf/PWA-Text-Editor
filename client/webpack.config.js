const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackPwaManifest } = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');


const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      serviceWorker: './src-sw.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'Your PWA Text Editor',
        short_name: 'Text Editor',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: 'service-worker.js',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src-sw.js', to: 'src-sw.js' },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
