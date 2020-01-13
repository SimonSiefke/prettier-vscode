import {
  createConnection,
  TextDocumentSyncKind,
  ServerRequestHandler
} from 'vscode-languageserver'
import { documentFormatting } from './documentFormatting'
import { documents } from './documents'
import {
  enableBetterErrorHandlingAndLogging,
  handleError
} from './errorHandlingAndLogging'

const connection = createConnection()

enableBetterErrorHandlingAndLogging(connection)

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    documentFormattingProvider: true
  }
}))

const handleRequest: <P, R, E>(
  handler: ServerRequestHandler<P, R, E>
) => ServerRequestHandler<P, R, E> = fn => async (...args) => {
  try {
    return await fn(...args)
  } catch (error) {
    handleError(error)
    throw error
  }
}

connection.onDocumentFormatting(handleRequest(documentFormatting))

documents.listen(connection)
connection.listen()
