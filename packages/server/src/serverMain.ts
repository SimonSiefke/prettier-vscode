import {
  createConnection,
  InitializeResult,
  TextDocuments,
  TextDocumentSyncKind,
  RequestType,
} from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { URI } from 'vscode-uri'
import {
  enableBetterErrorHandlingAndLogging,
  handleRequest,
} from './errorHandlingAndLogging'
import { clearCache } from 'service'

const documents = new TextDocuments(TextDocument)

const connection = createConnection()

enableBetterErrorHandlingAndLogging(connection)

const INITIALIZE_RESULT: InitializeResult = {
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    documentFormattingProvider: true,
  },
}

connection.onInitialize(() => INITIALIZE_RESULT)

connection.onDocumentFormatting(
  handleRequest(async (params, token) => {
    const document = documents.get(params.textDocument.uri)
    if (!document) {
      return undefined
    }
    const source = document.getText()
    const { format } = await import('service')
    const filePath = URI.parse(document.uri).fsPath
    const result = await format(source, filePath, document.languageId, token)
    switch (result.status) {
      case 'success': {
        console.log('success')
        return result.textEdits
      }
      case 'error': {
        console.log('an error occurred')
        break
      }
      case 'ignored': {
        console.log('file ignored')
        break
      }
      case 'cancelled': {
        console.log('cancelled')
        break
      }
    }
  })
)

connection.onRequest(
  new RequestType<{}, void | Promise<void>, undefined, undefined>(
    '$/clearCache'
  ),
  clearCache
)

documents.listen(connection)
connection.listen()
