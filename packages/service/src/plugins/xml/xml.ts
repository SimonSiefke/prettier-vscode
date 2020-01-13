import * as xml from '@prettier/plugin-xml'
import {Format} from '../pluginApi'

export const formatXml: Format = format => (text, options) =>
  format(text, {...options, plugins: [xml]})
