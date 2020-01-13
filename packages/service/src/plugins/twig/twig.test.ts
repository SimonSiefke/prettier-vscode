import {format} from 'prettier'
import {formatTwig} from './twig'

test('format twig', () => {
  expect(
    formatTwig(format)(
      `
<h1>hello world</h1>`,
      {
        filepath: 'index.twig'
      }
    )
  ).toBe(`<h1>
  hello world
</h1>
`)
})
