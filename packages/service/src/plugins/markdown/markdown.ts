import {Format} from '../pluginApi'

export const formatMarkdown: Format = format => (text, options) =>
  format(text, options)
