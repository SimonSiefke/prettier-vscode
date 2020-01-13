const withDefaults = require('./shared.webpack.config')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// @ts-ignore
const serviceDependencies = require('../packages/service/package.json')
  .dependencies
// @ts-ignore
const serverDependencies = require('../packages/server/package.json')
  .dependencies
const dependencies = { ...serviceDependencies, ...serverDependencies }
delete dependencies.service

const externals = Object.keys(dependencies).map(dependency => ({
  [dependency]: dependency,
}))

console.log('EXTERNALS')
console.log(externals)

module.exports = withDefaults({
  context: path.join(__dirname, '../packages/server'),
  entry: {
    serverMain: './src/serverMain.ts',
  },
  externals,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist', 'packages/server/dist'),
  },
  // plugins: [new BundleAnalyzerPlugin()],
})
