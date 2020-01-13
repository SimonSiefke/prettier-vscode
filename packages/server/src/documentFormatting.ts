import { formatDocument, preloadFormatter } from 'service'
import {
  DocumentFormattingParams,
  Position,
  Range,
  ServerRequestHandler,
  TextEdit
} from 'vscode-languageserver'
import { documents } from './documents'

const NULL_TEXT_EDIT: TextEdit[] = []

documents.onDidOpen(event => preloadFormatter(event.document.languageId))

export const documentFormatting: ServerRequestHandler<
  DocumentFormattingParams,
  TextEdit[],
  void
> = async params => {
  const document = documents.get(params.textDocument.uri)
  if (!document) {
    return NULL_TEXT_EDIT
  }
  const text = document.getText()
  const newText = await formatDocument(text, document.uri, document.languageId)
  if (!newText) {
    return NULL_TEXT_EDIT
  }
  const textEdit: TextEdit = TextEdit.replace(
    Range.create(Position.create(0, 0), document.positionAt(text.length)),
    newText
  )
  return [textEdit]
}
