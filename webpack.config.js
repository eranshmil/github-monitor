const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',

  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  },

  entry: './src/server/index.ts',

  output: {
    filename: './server.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './tsconfig.server.json'
        }
      }
    ]
  },

  plugins: [new CheckerPlugin(), new NodemonPlugin()]
};
