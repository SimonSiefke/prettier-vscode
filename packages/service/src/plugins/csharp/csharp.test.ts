import {format} from 'prettier'
import {formatCsharp} from './csharp'

test('format csharp', () => {
  expect(
    formatCsharp(format)(`    using System;`, {
      filepath: 'index.cs'
    })
  ).toBe(`using System;
`)
})
