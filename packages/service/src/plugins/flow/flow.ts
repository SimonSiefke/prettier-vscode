import type { Formatter } from '../pluginApi'

export const formatFlow: Formatter = (format) => (text, options) =>
  format(text, options)
