import {format} from 'prettier'
import {formatJavascript} from './javascript'

test('format javascript', () => {
  expect(
    formatJavascript(format)(`   let x`, {
      filepath: 'index.js'
    })
  ).toBe(`let x;
`)
})
