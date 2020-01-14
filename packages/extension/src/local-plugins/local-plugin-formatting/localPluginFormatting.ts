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
  'handlebars',
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
  'twig',
  'vue',
  'xml',
  'yaml',
]

const getDocumentSelector: () => DocumentSelector = () => {
  const enabledLanguageIds = vscode.workspace
    .getConfiguration('prettier', undefined)
    .get<string[]>('enabledLanguageIds', DEFAULT_ENABLED_LANGUAGE_IDS)
  const schemes: string[] = ['file', 'untitled']
  const documentSelector: DocumentSelector = enabledLanguageIds.flatMap(
    languageId =>
      schemes.map(scheme => ({
        scheme,
        language: languageId,
      }))
  )
  return documentSelector
}

const getLanguageClientOptions: () => LanguageClientOptions = () => {
  const languageClientOptions: LanguageClientOptions = {
    documentSelector: getDocumentSelector(),
    // synchronize
  }
  return languageClientOptions
}

const PRETTIER_CONFIG_FILES = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yaml',
  '.prettierrc.yml',
  '.prettierrc.js',
  'package.json',
  'prettier.config.js',
  '.editorconfig',
]

export const localPluginFormatting: LocalPlugin = async context => {
  const languageClientProxy = await createLanguageClientProxy(
    context,
    'prettier',
    'Prettier',
    getLanguageClientOptions()
  )
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(event => {
      if (!event.affectsConfiguration('prettier.enabledLanguageIds')) {
        return
      }
      languageClientProxy.restart(getLanguageClientOptions())
    })
  )
  const prettierConfigWatcher = vscode.workspace.createFileSystemWatcher(
    `**/{${PRETTIER_CONFIG_FILES.join(',')}}`
  )
  context.subscriptions.push(prettierConfigWatcher)
  prettierConfigWatcher.onDidChange(() =>
    languageClientProxy.restart(getLanguageClientOptions())
  )
  prettierConfigWatcher.onDidCreate(() =>
    languageClientProxy.restart(getLanguageClientOptions())
  )
  prettierConfigWatcher.onDidDelete(() =>
    languageClientProxy.restart(getLanguageClientOptions())
  )
}
