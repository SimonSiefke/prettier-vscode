import {Options} from 'prettier'

type Prettier = typeof import('prettier')

export type Format = (
  format: Prettier['format']
) => (text: string, options?: Options) => string | undefined
