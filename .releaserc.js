module.exports = {
  verifyConditions: ['semantic-release-vsce'],
  prepare: [
    {
      path: 'semantic-release-vsce',
      packageVsix: 'extension.vsix',
    },
  ],
  publish: ['semantic-release-vsce'],
}
