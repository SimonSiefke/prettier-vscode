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
let _resolve: ((value: FormatDocumentResult) => void) | undefined

export const formatWithWorker: (
  source: string,
  filePath: string,
  languageId: string,
  token: CancellationToken
) => Promise<FormatDocumentResult> = (source, filePath, languageId, token) =>
  new Promise((resolve) => {
    id = createId()
    const currentId = id
    console.log(`run ${currentId}`)
    if (workerState === 'working') {
      assert(worker !== undefined)
      worker!.removeAllListeners()
      worker!.terminate()
      worker = createWorker()
      console.log('kill worker')
      workerState = 'idle'
      if (_resolve) {
        _resolve({ status: 'cancelled' })
      }
    }
    if (workerState === 'uninitialized') {
      assert(worker === undefined)
      worker = createWorker()
      workerState = 'idle'
    }
    _resolve = resolve
    assert(workerState === 'idle')
    assert(worker !== undefined)
    worker!.once('message', (value) => {
      assert(workerState === 'working')
      assert(worker !== undefined)
      assert(currentId === id)
      worker!.removeAllListeners()
      workerState = 'idle'
      console.log(`done ${currentId}`)
      resolve(value)
    })
    workerState = 'working'
    worker!.postMessage({ source, filePath, languageId })
    token.onCancellationRequested(() => {
      if (id !== currentId) {
        return
      }
      assert(workerState === 'working' || workerState === 'idle')
      if (workerState === 'working') {
        assert(worker !== undefined)
        worker!.removeAllListeners()
        worker!.terminate()
        worker = undefined
        workerState = 'uninitialized'
        resolve({
          status: 'cancelled',
        })
      }
    })
  })

export const formatWithWorkerClearCache = () => {
  if (worker) {
    worker.removeAllListeners()
    worker.terminate()
    worker = undefined
  }
}
