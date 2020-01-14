import { format } from 'prettier'
import { formatJava } from './java'

test('format java', () => {
  expect(
    formatJava(format)(
      `
class HelloWorld {

  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}

`,
      {
        filepath: 'index.java',
      }
    )
  ).toBe(`class HelloWorld {

  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
`)
})
