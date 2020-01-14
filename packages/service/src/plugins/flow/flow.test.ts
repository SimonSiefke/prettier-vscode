import { format } from 'prettier'
import { formatFlow } from './flow'

test('format vue', () => {
  expect(
    formatFlow(format)(
      `
// @flow
function square(n: number): number {
  return n * n;
}`,
      {
        filepath: 'index.js',
      }
    )
  ).toBe(`// @flow
function square(n: number): number {
  return n * n;
}
`)
})
