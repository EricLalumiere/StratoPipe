// JavaScript
const path = require('path');

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    entry: path.resolve(__dirname, 'src/project/index.js'),
    output: {
      filename: 'project.bundle.js',
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
};