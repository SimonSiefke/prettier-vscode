import { Formatter } from '../pluginApi'

export const formatJson: Formatter = format => (text, options) =>
  format(text, options)
