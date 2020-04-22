import * as assert from 'assert'
import * as path from 'path'
import type { CancellationToken } from 'vscode-jsonrpc'
import { Worker } from 'worker_threads'
import type { FormatDocumentResult } from './formatDocument'

const createWorker = () => new Worker(path.join(__dirname, 'worker.js'), {})

let worker: Worker | undefined = undefined

const createId = (() => {
  let id = 0
  return () => id++
})()

let id = createId()

let workerState: 'uninitialized' | 'idle' | 'working' = 'uninitialized'

export const formatWithWorker: (
  source: string,
  filePath: string,
  languageId: string,
  token: CancellationToken
) => Promise<FormatDocumentResult> = (source, filePath, languageId, token) =>
  new Promise((resolve) => {
    id = createId()
    const currentId = id
    if (workerState === 'uninitialized') {
      assert(worker === undefined)
      worker = createWorker()
      workerState = 'idle'
    }
    token.onCancellationRequested(() => {
      if (id !== currentId) {
        return
      }
      assert(workerState === 'working' || workerState === 'idle')
      if (workerState === 'working') {
        worker!.removeAllListeners()
        worker!.terminate()
        worker = undefined
        workerState = 'uninitialized'
        resolve({
          status: 'cancelled',
        })
      }
    })
    worker!.once('message', (value) => {
      assert(workerState === 'working')
      assert(currentId === id)
      workerState = 'idle'
      resolve(value)
    })
    worker!.on('exit', () => {
      console.log('worker exited')
    })
    workerState = 'working'
    worker!.postMessage({ source, filePath, languageId })
  })

export const formatWithWorkerClearCache = () => {
  if (worker) {
    worker.removeAllListeners()
    worker.terminate()
    worker = undefined
  }
}
