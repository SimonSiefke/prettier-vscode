import * as assert from 'assert'
import { before, test } from 'mocha'
import * as path from 'path'
import * as vscode from 'vscode'
import { activateExtension } from '../../test-utils'

suite('Multiroot', () => {
  before(async () => {
    await activateExtension()
  })

  test('multiroot', async () => {
    const workspace1 = vscode.workspace.workspaceFolders[0]
    const workspace2 = vscode.workspace.workspaceFolders[1]
    const workspace3 = vscode.workspace.workspaceFolders[2]
    const indexJs1 = path.join(workspace1.uri.fsPath, 'index.js')
    const indexJs2 = path.join(workspace2.uri.fsPath, 'index.js')
    const indexJs3 = path.join(workspace3.uri.fsPath, 'index.js')
    const document1 = await vscode.workspace.openTextDocument(
      vscode.Uri.file(indexJs1)
    )
    await vscode.window.showTextDocument(document1)
    await new Promise(resolve => setTimeout(resolve, 100))
    await vscode.commands.executeCommand('editor.action.format')
    assert.equal(
      vscode.window.activeTextEditor.document.getText(),
      'export const x = "hello world"\n',
      'document 1 failed'
    )
    const document2 = await vscode.workspace.openTextDocument(
      vscode.Uri.file(indexJs2)
    )
    await vscode.window.showTextDocument(document2)
    await new Promise(resolve => setTimeout(resolve, 100))
    await vscode.commands.executeCommand('editor.action.format')
    assert.equal(
      vscode.window.activeTextEditor.document.getText(),
      'export const x = "hello world";\n',
      'document 2 failed'
    )
    const document3 = await vscode.workspace.openTextDocument(
      vscode.Uri.file(indexJs3)
    )
    await vscode.window.showTextDocument(document3)
    await new Promise(resolve => setTimeout(resolve, 100))
    await vscode.commands.executeCommand('editor.action.format')
    assert.equal(
      vscode.window.activeTextEditor.document.getText(),
      "export const x = 'hello world'\n",
      'document 3 failed'
    )
  })
})
