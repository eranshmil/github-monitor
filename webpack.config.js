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

  plugins: [
    new CheckerPlugin(),
    new NodemonPlugin({
      env: { TS_NODE_PROJECT: 'tsconfig.server.json' },
      nodeArgs: [
        process.env.INSPECT_BRK ? '--inspect-brk' : '--inspect',
        '--require=ts-node/register',
        '--require=tsconfig-paths/register'
      ],
      watch: ['src/server', '.env'],
      ext: 'ts',
      script: 'src/server/index.ts'
    })
  ]
};
