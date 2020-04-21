import * as assert from 'assert'
import * as path from 'path'
import type { CancellationToken } from 'vscode-jsonrpc'
import { Worker } from 'worker_threads'
import type { FormatDocumentResult } from './formatDocument'

const createWorker = () => new Worker(path.join(__dirname, 'worker.js'), {})

let worker: Worker | undefined

export const formatWithWorker: (
  source: string,
  filePath: string,
  languageId: string,
  token: CancellationToken
) => Promise<FormatDocumentResult> = (source, filePath, languageId, token) =>
  new Promise((resolve) => {
    let state:
      | 'uninitialized'
      | 'initialized'
      | 'working'
      | 'done'
      | 'cancelled' = 'uninitialized'
    if (!worker) {
      worker = createWorker()
    }
    state = 'initialized'
    token.onCancellationRequested(() => {
      assert(state === 'working' || state === 'done')
      if (state === 'working') {
        worker!.removeAllListeners()
        worker!.terminate()
        worker = undefined
        state = 'cancelled'
      }
    })
    worker.once('message', (value) => {
      assert(state === 'working')
      state = 'done'
      resolve(value)
    })
    worker.on('exit', () => {
      console.log('worker exited')
    })
    state = 'working'
    worker.postMessage({ source, filePath, languageId })
  })

export const formatWithWorkerClearCache = () => {
  if (worker) {
    worker.removeAllListeners()
    worker.terminate()
    worker = undefined
  }
}
