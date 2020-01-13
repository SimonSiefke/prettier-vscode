import * as ruby from '@prettier/plugin-ruby'
import { Format } from '../pluginApi'

export const formatRuby: Format = format => (text, options) =>
  format(text, { ...options, plugins: [ruby] })
