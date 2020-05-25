import type { Formatter } from '../pluginApi'

export const formatLess: Formatter = (format) => (text, options) =>
  format(text, options)
