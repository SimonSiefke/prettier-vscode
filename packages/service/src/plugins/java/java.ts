import * as java from 'prettier-plugin-java'
import { Formatter } from '../pluginApi'

export const formatJava: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [java] })
