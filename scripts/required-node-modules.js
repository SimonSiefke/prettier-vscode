const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')

const root = path.join(__dirname, '..')

if (fs.existsSync(path.join(root, 'tmp'))) {
  fs.removeSync(path.join(root, 'tmp'))
}

const servicePackageJSON = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/service/package.json')).toString()
)
const serverPackageJSON = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/server/package.json')).toString()
)

const nodeModules = {
  ...servicePackageJSON.dependencies,
  ...serverPackageJSON.dependencies,
}

delete nodeModules.service

const dummyPackageJSON =
  JSON.stringify({ dependencies: nodeModules }, null, 2) + '\n'

fs.ensureDirSync(path.join(root, 'tmp'))
fs.writeFileSync(path.join(root, 'tmp/package.json'), dummyPackageJSON)
execSync(
  `cd ${root}/tmp && npm install && npx install-peerdeps melody-extension-core`,
  {
    stdio: 'inherit',
  }
)
fs.copySync(path.join(root, 'tmp/node_modules'), 'dist/node_modules')
fs.copySync(path.join(root, 'tmp/package-lock.json'), 'dist/package-lock.json')
if (fs.existsSync(path.join(root, 'dist', 'package.json'))) {
  const tmpPackageJSON = JSON.parse(
    fs.readFileSync(path.join(root, 'tmp/package.json')).toString()
  )
  const distPackageJSON = JSON.parse(
    fs.readFileSync(path.join(root, 'dist/package.json')).toString()
  )
  distPackageJSON.dependencies = tmpPackageJSON.dependencies
  fs.writeFileSync(
    path.join(root, 'dist/package.json'),
    JSON.stringify(distPackageJSON, null, 2) + '\n'
  )
}
console.log('done')

// TODO could be more efficient by removing jshintrc, LICENSE, README, test files, eslintignore, tsconfig.json, typings, d.ts, history.md, npmignore, travis.yml, Contributing.md, CHANGELOG.md etc.

// console.log(nodeModules)
