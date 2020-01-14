import { format } from 'prettier'
import { formatKotlin } from './kotlin'

test.skip('format kotlin', () => {
  expect(
    formatKotlin(format)(
      `
fun main(args : Array<String>) {
    println("Hello, World!")
}`,
      {
        filepath: 'index.kt',
      }
    )
  ).toBe(`fun main(args : Array<String>) {
    println("Hello, World!")
}
`)
})
