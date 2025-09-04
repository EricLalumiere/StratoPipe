// JavaScript
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/pm/index.js'),
  output: {
    filename: 'pm.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: false
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};