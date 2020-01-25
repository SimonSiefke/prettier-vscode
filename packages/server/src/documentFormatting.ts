import {
  DocumentFormattingParams,
  Range,
  ServerRequestHandler,
  TextEdit,
} from 'vscode-languageserver'
import { documents } from './documents'

const NULL_TEXT_EDIT: TextEdit[] = []

documents.onDidOpen(async event => {
  const { preloadFormatter } = await import('service')
  await preloadFormatter(event.document.uri, event.document.languageId).catch(
    error => {
      console.log(
        `[Error] Prettier failed to preload formatter due to: \n` + error
      )
      console.log(error.stack)
    }
  )
})

const minimizeEdit: (
  text: string,
  newText: string
) => { startOffset: number; endOffset: number; insertedText: string } = (
  text,
  newText
) => {
  const length = Math.min(text.length, newText.length)
  let startSame = 0
  while (startSame < length) {
    if (text[startSame] !== newText[startSame]) {
      break
    }
    startSame++
  }
  let endSame = 1
  while (endSame < length - startSame) {
    if (text[text.length - endSame] !== newText[newText.length - endSame]) {
      break
    }
    endSame++
  }
  endSame--
  const startOffset = startSame
  const endOffset = text.length - endSame
  const insertedText = newText.slice(startSame, newText.length - endSame)
  return {
    startOffset,
    endOffset,
    insertedText,
  }
}

export const documentFormatting: ServerRequestHandler<
  DocumentFormattingParams,
  TextEdit[],
  any,
  void
> = async params => {
  const document = documents.get(params.textDocument.uri)
  if (!document) {
    return NULL_TEXT_EDIT
  }
  const text = document.getText()
  const { formatDocument } = await import('service')
  const newText = await formatDocument(
    text,
    document.uri,
    document.languageId
  ).catch(error => {
    console.log(`[Error] Prettier failed to format the file due to: \n` + error)
    console.log(error.stack)
  })
  if (!newText) {
    return NULL_TEXT_EDIT
  }
  const { startOffset, endOffset, insertedText } = minimizeEdit(text, newText)
  const textEdit: TextEdit = TextEdit.replace(
    Range.create(
      document.positionAt(startOffset),
      document.positionAt(endOffset)
    ),
    insertedText
  )
  return [textEdit]
}

export const clearDocumentFormattingCache = async () => {
  console.log('[Prettier] clear cache')
  const { clearCache } = await import('service')
  clearCache()
}
