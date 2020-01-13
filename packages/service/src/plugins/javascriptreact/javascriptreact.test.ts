import {format} from 'prettier'
import {formatJavascriptReact} from './javascriptreact'

test('format javascriptreact', () => {
  expect(
    formatJavascriptReact(format)(`   let x`, {
      filepath: 'index.jsx'
    })
  ).toBe(`let x;
`)
})
