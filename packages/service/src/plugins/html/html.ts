import {Formatter} from '../pluginApi'

export const formatHtml: Formatter = format => (text, options) =>
  format(text, options)
