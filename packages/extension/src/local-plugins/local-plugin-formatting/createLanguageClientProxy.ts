import * as vscode from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient'

export interface LanguageClientProxy {}

export const createLanguageClientProxy: (
  context: vscode.ExtensionContext,
  id: string,
  name: string,
  clientOptions: LanguageClientOptions
) => Promise<LanguageClientProxy> = async (
  context,
  id,
  name,
  clientOptions
) => {
  const serverModule = context.asAbsolutePath('../server/dist/serverMain.js')
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] }
    }
  }
  const outputChannel = vscode.window.createOutputChannel(name)
  clientOptions.outputChannel = {
    name: outputChannel.name,
    append() {},
    appendLine(value: string) {
      try {
        const message = JSON.parse(value)
        if (!message.isLSPMessage) {
          outputChannel.appendLine(value)
        }
      } catch (error) {
        if (typeof value !== 'object') {
          outputChannel.appendLine(value)
        }
      }
    },
    clear() {
      outputChannel.clear()
    },
    show() {
      outputChannel.show()
    },
    hide() {
      outputChannel.hide()
    },
    dispose() {
      outputChannel.dispose()
    }
  }

  const languageClient = new LanguageClient(
    id,
    name,
    serverOptions,
    clientOptions
  )

  languageClient.registerProposedFeatures()
  context.subscriptions.push(languageClient.start())
  await languageClient.onReady()
  const languageClientProxy: LanguageClientProxy = {}
  return languageClientProxy
}
