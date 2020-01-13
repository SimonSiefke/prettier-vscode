import * as xml from '@prettier/plugin-xml'
import {Formatter} from '../pluginApi'

export const formatXml: Formatter = format => (text, options) =>
  format(text, {...options, plugins: [xml]})
