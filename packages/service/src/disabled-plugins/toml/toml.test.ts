import { format } from 'prettier'
import { formatToml } from './toml'

test.only('format yaml', () => {
  expect(
    formatToml(format)(
      `
title = "TOML Example"
`,
      {
        filepath: 'index.toml',
      }
    )
  ).toBe(`title = "TOML Example"
`)
})
