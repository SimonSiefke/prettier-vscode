import type { Formatter } from '../pluginApi'

export const formatJsonc: Formatter = (format) => (text, options) =>
  format(text, options)
