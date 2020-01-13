import {format} from 'prettier'
import {formatMarkdown} from './markdown'

test('format markdown', () => {
  expect(
    formatMarkdown(format)(` # hello world`, {
      filepath: 'index.md'
    })
  ).toBe(`# hello world
`)
})
