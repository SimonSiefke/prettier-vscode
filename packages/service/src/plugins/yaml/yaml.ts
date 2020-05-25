import type { Formatter } from '../pluginApi'

export const formatYaml: Formatter = (format) => (text, options) =>
  format(text, options)
