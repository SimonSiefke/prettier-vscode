import { formatElm } from './elm'
import { format } from 'prettier'

test('format elm', () => {
  expect(
    formatElm(format)(
      `
main =
    text "Hello, World!"
`,
      {
        filepath: 'index.elm',
      }
    )
  ).toBe(`module Main exposing (main)


main =
    text "Hello, World!"
`)
})
