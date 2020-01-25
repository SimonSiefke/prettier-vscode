import {
  createConnection,
  TextDocumentSyncKind,
  ServerRequestHandler,
  RequestType,
} from 'vscode-languageserver'
import {
  documentFormatting,
  clearDocumentFormattingCache,
} from './documentFormatting'
import { documents } from './documents'
import {
  enableBetterErrorHandlingAndLogging,
  handleError,
} from './errorHandlingAndLogging'

const connection = createConnection()

enableBetterErrorHandlingAndLogging(connection)

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    documentFormattingProvider: true,
  },
}))

const handleRequest: <P, R, PR, E>(
  handler: ServerRequestHandler<P, R, PR, E>
) => ServerRequestHandler<P, R, PR, E> = fn => async (...args) => {
  try {
    return await fn(...args)
  } catch (error) {
    handleError(error)
    throw error
  }
}

connection.onDocumentFormatting(handleRequest(documentFormatting))

connection.onRequest(
  new RequestType<{}, Promise<void>, undefined, undefined>('$/clearCache'),
  clearDocumentFormattingCache
)

documents.listen(connection)
connection.listen()
