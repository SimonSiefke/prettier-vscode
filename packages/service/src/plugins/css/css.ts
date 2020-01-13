import { Formatter } from '../pluginApi'

export const formatCss: Formatter = format => (text, options) =>
  format(text, options)
