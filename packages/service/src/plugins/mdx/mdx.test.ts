import {format} from 'prettier'
import {formatMdx} from './mdx'

test('format mdx', () => {
  expect(
    formatMdx(format)(` # hello world`, {
      filepath: 'index.mdx'
    })
  ).toBe(`# hello world
`)
})
