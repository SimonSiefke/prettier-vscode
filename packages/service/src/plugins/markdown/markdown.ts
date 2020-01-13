import {Formatter} from '../pluginApi'

export const formatMarkdown: Formatter = format => (text, options) =>
  format(text, options)
