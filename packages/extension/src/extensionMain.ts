import 'source-map-support/register'
import * as vscode from 'vscode'
import { localPluginEnableFormatOnSave } from './local-plugins/local-plugin-enable-format-on-save/localPluginEnableFormatOnSave'
import { localPluginFormatting } from './local-plugins/local-plugin-formatting/localPluginFormatting'
import { LocalPlugin } from './local-plugins/pluginApi'

const LOCAL_PLUGINS: LocalPlugin[] = [
  localPluginFormatting,
  // localPluginEnableFormatOnSave,
]

export const activate: (
  context: vscode.ExtensionContext
) => Promise<void> = async context => {
  await Promise.all([LOCAL_PLUGINS.map(localPlugin => localPlugin(context))])
}
