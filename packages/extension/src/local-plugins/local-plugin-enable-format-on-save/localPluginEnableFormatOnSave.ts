import * as vscode from 'vscode'
import { LocalPlugin } from '../pluginApi'

export const localPluginEnableFormatOnSave: LocalPlugin = async context => {
  console.log('enable format')
  const shouldEnabledFormatOnSave = await vscode.window.showInformationMessage(
    'Do you want to enable format on save (recommended)?',
    'Yes',
    'No'
  )
  console.log('activated')
  console.log(shouldEnabledFormatOnSave)
}
