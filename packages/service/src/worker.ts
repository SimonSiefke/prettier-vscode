import { parentPort } from 'worker_threads'
import { formatDocument } from './formatDocument'

parentPort!.on('message', async ({ source, filePath, languageId }) => {
  const result = await formatDocument(source, filePath, languageId)
  parentPort!.postMessage(result)
})
