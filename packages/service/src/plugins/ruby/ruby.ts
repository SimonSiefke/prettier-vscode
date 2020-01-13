import * as ruby from '@prettier/plugin-ruby'
import { Formatter } from '../pluginApi'

export const formatRuby: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [ruby] })
