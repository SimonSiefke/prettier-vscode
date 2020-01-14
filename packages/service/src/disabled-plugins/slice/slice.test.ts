import { format } from 'prettier'
import { formatSlice } from './slice'

test.skip('format slice', () => {
  expect(
    formatSlice(format)(
      `
#if defined(__ICE_VERSION__) && __ICE_VERSION__ >= 030500
enum Fruit { Apple, Pear = 3, Orange };
#else
enum Fruit { Apple, Pear, Orange };
#endif

`,
      {
        filepath: 'index.ice',
      }
    )
  ).toBe(`#pragma once
`)
})
