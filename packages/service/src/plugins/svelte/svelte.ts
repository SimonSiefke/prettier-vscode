import * as svelte from 'prettier-plugin-svelte'
import {Format} from '../pluginApi'

// TODO this has an implicit dependency on svelte, might be difficult to bundle
export const formatSvelte: Format = format => (text, options) =>
  format(text, {...options, plugins: [svelte]})
