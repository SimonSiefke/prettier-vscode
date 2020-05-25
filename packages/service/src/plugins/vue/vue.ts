import type { Formatter } from '../pluginApi'

export const formatVue: Formatter = (format) => (text, options) =>
  format(text, options)
