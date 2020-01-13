import * as vscode from 'vscode'
import { DocumentSelector, LanguageClientOptions } from 'vscode-languageclient'
import { LocalPlugin } from '../pluginApi'
import { createLanguageClientProxy } from './createLanguageClientProxy'

const DEFAULT_ENABLED_LANGUAGE_IDS = [
  'csharp',
  'css',
  'elm',
  'flow',
  'graphql',
  'html',
  'java',
  'javascript',
  'javascriptreact',
  'json',
  'jsonc',
  'less',
  'markdown',
  'mdx',
  'php',
  'postcss',
  'ruby',
  'scss',
  'solidity',
  'svelte',
  'typescript',
  'typescriptreact',
  'vue',
  'xml',
  'yaml'
]

const getDocumentSelector: () => DocumentSelector = () => {
  const enabledLanguageIds = vscode.workspace
    .getConfiguration('prettier', vscode.window.activeTextEditor?.document.uri)
    .get<string[]>('enabledLanguageIds', DEFAULT_ENABLED_LANGUAGE_IDS) // TODO

  // console.log(
  //   vscode.workspace.getConfiguration('prettier').inspect('enabledLanguageIds')
  // )
  // console.log('ENABLED')
  // console.log(enabledLanguageIds)
  const schemes: string[] = ['file', 'untitled']
  const documentSelector: DocumentSelector = enabledLanguageIds.flatMap(
    languageId =>
      schemes.map(scheme => ({
        scheme,
        language: languageId
      }))
  )
  console.log(documentSelector)
  return documentSelector
}

export const localPluginFormatting: LocalPlugin = async context => {
  const languageClientOptions: LanguageClientOptions = {
    documentSelector: getDocumentSelector()
  }
  const languageClientProxy = await createLanguageClientProxy(
    context,
    'prettier',
    'Prettier',
    languageClientOptions
  )
}
