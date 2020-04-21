import 'source-map-support/register'
import * as vscode from 'vscode'
import { localPluginFormatting } from './local-plugins/local-plugin-formatting/localPluginFormatting'

export const activate: (
  context: vscode.ExtensionContext
) => Promise<void> = async (context) => {
  localPluginFormatting(context)
}
