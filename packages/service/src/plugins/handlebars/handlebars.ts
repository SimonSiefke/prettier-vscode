import { Formatter } from '../pluginApi'

export const formatHandlebars: Formatter = format => (text, options) =>
  // @ts-ignore
  format(text, { ...options, parser: 'glimmer' })
