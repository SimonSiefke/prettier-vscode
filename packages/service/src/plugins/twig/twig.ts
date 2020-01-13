import * as twig from 'prettier-plugin-twig-melody'
import {Format} from '../pluginApi'

export const formatTwig: Format = format => (text, options) =>
  format(text, {...options, plugins: [twig]})
