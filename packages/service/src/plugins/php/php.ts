import * as php from '@prettier/plugin-php'
import type { Formatter } from '../pluginApi'

export const formatPhp: Formatter = (format) => (text, options) =>
  format(text, { ...options, plugins: [php] })
