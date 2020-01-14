import * as vscode from 'vscode'
import { LocalPlugin } from '../pluginApi'

interface State {
  hasAskedUserAboutFormatOnSave: boolean
}

const getState: (
  context: vscode.ExtensionContext,
  key: keyof State
) => State[typeof key] | undefined = (context, key) => {
  const state = context.globalState.get<State[typeof key]>(key)
  return state
}

const setState: (
  context: vscode.ExtensionContext,
  key: keyof State,
  value: State[typeof key]
) => Promise<void> = async (context, key, value) => {
  await context.globalState.update(key, value)
}

export const localPluginEnableFormatOnSave: LocalPlugin = async context => {
  const hasAskedUserAboutFormatOnSave = getState(
    context,
    'hasAskedUserAboutFormatOnSave'
  )
  // if (hasAskedUserAboutFormatOnSave) {
  //   return
  // }
  await setState(context, 'hasAskedUserAboutFormatOnSave', true)
  const shouldEnableFormatOnSave = await vscode.window.showInformationMessage(
    'Do you want to enable format on save (recommended)?',
    'Yes',
    'No'
  )
  if (!shouldEnableFormatOnSave) {
    return
  }
  await vscode.workspace.getConfiguration('editor').update('formatOnSave', true)
  console.log('activated')
  console.log(shouldEnableFormatOnSave)
}
