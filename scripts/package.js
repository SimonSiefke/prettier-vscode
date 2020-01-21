const path = require('path')
const fs = require('fs-extra')

const root = path.join(__dirname, '..')

if (!fs.existsSync(path.join(root, 'dist'))) {
  fs.mkdirSync(path.join(root, 'dist'))
}

// @ts-ignore
const pkg = require('../packages/extension/package.json')

pkg.main = './packages/extension/dist/extensionMain.js'

delete pkg.dependencies
delete pkg.devDependencies
delete pkg.scripts
delete pkg.enableProposedApi

fs.writeFileSync(
  path.join(root, 'dist/package.json'),
  `${JSON.stringify(pkg, null, 2)}\n`
)

fs.copyFileSync(path.join(root, 'README.md'), path.join(root, 'dist/README.md'))
fs.copyFileSync(
  path.join(root, 'CHANGELOG.md'),
  path.join(root, 'dist/CHANGELOG.md')
)
fs.copyFileSync(
  path.join(root, 'packages/extension/icon.png'),
  path.join(root, 'dist/icon.png')
)
fs.copyFileSync(
  path.join(root, 'packages/extension/package-json-schema.json'),
  path.join(root, 'dist/package-json-schema.json')
)

let extensionMain = fs
  .readFileSync(
    path.join(root, `dist/packages/extension/dist/extensionMain.js`)
  )
  .toString()

extensionMain = extensionMain.replace(
  '../server/dist/serverMain.js',
  './packages/server/dist/serverMain.js'
)

fs.writeFileSync(
  path.join(root, `dist/packages/extension/dist/extensionMain.js`),
  extensionMain
)

require('./required-node-modules')
