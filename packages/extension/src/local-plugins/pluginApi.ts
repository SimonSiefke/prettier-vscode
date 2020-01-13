import * as vscode from 'vscode'

export type LocalPlugin = (context: vscode.ExtensionContext) => Promise<void>
