const withDefaults = require('./shared.webpack.config')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = withDefaults({
  context: path.join(__dirname, '../packages/extension'),
  entry: {
    extensionMain: './src/extensionMain.ts',
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        'vscode-dependencies': {
          test: /node_modules\/(vscode|semver)/,
          chunks: 'all',
          name: 'vscode-dependencies',
        },
        dependencies: {
          test: /node_modules\/(source-map|source-map-support)/,
          chunks: 'all',
          name: 'dependencies',
        },
      },
    },
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist', 'packages/extension/dist'),
  },
  // plugins: [new BundleAnalyzerPlugin()],
})
