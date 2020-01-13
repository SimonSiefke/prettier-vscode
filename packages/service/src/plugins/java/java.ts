import * as java from 'prettier-plugin-java'
import { Format } from '../pluginApi'

export const formatJava: Format = format => (text, options) =>
  format(text, { ...options, plugins: [java] })
