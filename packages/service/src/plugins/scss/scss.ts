import type { Formatter } from '../pluginApi'

export const formatScss: Formatter = (format) => (text, options) =>
  format(text, options)
