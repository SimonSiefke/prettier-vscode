import { format, getFileInfo, Options, resolveConfig } from 'prettier'
import type { TextEdit, CancellationToken } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type { Formatter } from './plugins/pluginApi'

const DEFAULT_OPTIONS: Options = {
  htmlWhitespaceSensitivity: 'ignore',
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
}

let getOptionsCache: { [key: string]: Options } = Object.create(null)
const getOptions: (filePath: string) => Promise<Options> = async (filePath) => {
  if (!(filePath in getOptionsCache)) {
    let options = (await resolveConfig(filePath)) || DEFAULT_OPTIONS
    options = { ...options, filepath: filePath }
    getOptionsCache[filePath] = options
  }
  return getOptionsCache[filePath]
}

let getIsIgnoredCache: { [key: string]: boolean } = Object.create(null)
const getIsIgnored: (filePath: string) => Promise<boolean> = async (
  filePath
) => {
  if (!(filePath in getIsIgnoredCache)) {
    const fileInfo = await getFileInfo(filePath, { withNodeModules: true })
    getIsIgnoredCache[filePath] = fileInfo.ignored
  }
  return getIsIgnoredCache[filePath]
}

const FORMATTING_MAP: { [key: string]: () => Promise<Formatter> } = {
  // async ansible() {
  //   const { formatYaml } = await import('./plugins/yaml/yaml')
  //   return formatYaml
  // },
  async csharp() {
    const { formatCsharp } = await import('./plugins/csharp/csharp')
    return formatCsharp
  },
  async css() {
    const { formatCss } = await import('./plugins/css/css')
    return formatCss
  },
  async elm() {
    const { formatElm } = await import('./plugins/elm/elm')
    return formatElm
  },
  async flow() {
    const { formatFlow } = await import('./plugins/flow/flow')
    return formatFlow
  },
  async graphql() {
    const { formatGraphql } = await import('./plugins/graphql/graphql')
    return formatGraphql
  },
  async handlebars() {
    const { formatHandlebars } = await import('./plugins/handlebars/handlebars')
    return formatHandlebars
  },
  async html() {
    const { formatHtml } = await import('./plugins/html/html')
    return formatHtml
  },
  async java() {
    const { formatJava } = await import('./plugins/java/java')
    return formatJava
  },
  async javascript() {
    const { formatJavascript } = await import('./plugins/javascript/javascript')
    return formatJavascript
  },
  async javascriptreact() {
    const { formatJavascriptReact } = await import(
      './plugins/javascriptreact/javascriptreact'
    )
    return formatJavascriptReact
  },
  async json() {
    const { formatJson } = await import('./plugins/json/json')
    return formatJson
  },
  async jsonc() {
    const { formatJsonc } = await import('./plugins/jsonc/jsonc')
    return formatJsonc
  },
  async less() {
    const { formatLess } = await import('./plugins/less/less')
    return formatLess
  },
  async markdown() {
    const { formatMarkdown } = await import('./plugins/markdown/markdown')
    return formatMarkdown
  },
  async mdx() {
    const { formatMdx } = await import('./plugins/mdx/mdx')
    return formatMdx
  },
  // async php() {
  //   const { formatPhp } = await import('./plugins/php/php')
  //   return formatPhp
  // },
  async postcss() {
    const { formatPostcss } = await import('./plugins/postcss/postcss')
    return formatPostcss
  },
  // async ruby() {
  //   const { formatRuby } = await import('./plugins/ruby/ruby')
  //   return formatRuby
  // },
  async scss() {
    const { formatScss } = await import('./plugins/scss/scss')
    return formatScss
  },
  // async solidity() {
  //   const { formatSolidity } = await import('./disabled-plugins/solidity/solidity')
  //   return formatSolidity
  // },
  async svelte() {
    const { formatSvelte } = await import('./plugins/svelte/svelte')
    return formatSvelte
  },
  async typescript() {
    const { formatTypescript } = await import('./plugins/typescript/typescript')
    return formatTypescript
  },
  async typescriptreact() {
    const { formatTypescriptreact } = await import(
      './plugins/typescriptreact/typescriptreact'
    )
    return formatTypescriptreact
  },
  async twig() {
    const { formatTwig } = await import('./plugins/twig/twig')
    return formatTwig
  },
  async vue() {
    const { formatVue } = await import('./plugins/vue/vue')
    return formatVue
  },
  async xml() {
    const { formatXml } = await import('./plugins/xml/xml')
    return formatXml
  },
  async yaml() {
    const { formatYaml } = await import('./plugins/yaml/yaml')
    return formatYaml
  },
}

let getFormatterCache: {
  [key: string]: Formatter | undefined
} = Object.create(null)
const getFormatter: (
  languageId: string
) => Promise<Formatter | undefined> = async (languageId) => {
  if (!(languageId in getFormatterCache)) {
    if (languageId in FORMATTING_MAP) {
      getFormatterCache[languageId] = await FORMATTING_MAP[languageId]()
    } else {
      getFormatterCache[languageId] = undefined
    }
  }
  return getFormatterCache[languageId]
}

const fixPath = (filePath: string, languageId: string) => {
  if (filePath.endsWith('.svg')) {
    return filePath + '.xml'
  }
  if (filePath.endsWith('.map')) {
    return filePath + '.json'
  }
  if (filePath.endsWith('.code-workspace')) {
    return filePath + '.json'
  }
  if (languageId === 'json' && !filePath.endsWith('.json')) {
    return filePath + '.json'
  }
  return filePath
}

let preloadFormatterCache: Set<string> = new Set()
export const preloadFormatter: (
  filePath: string,
  languageId: string
) => Promise<void> = async (filePath: string, languageId: string) => {
  filePath = fixPath(filePath, languageId)
  if (preloadFormatterCache.has(filePath)) {
    return
  }
  preloadFormatterCache.add(filePath)
  const formatter = await getFormatter(languageId)
  const isIgnored = await getIsIgnored(filePath)
  const options = await getOptions(filePath)
  if (!formatter || isIgnored) {
    return
  }
  formatter(format)('', options)
}

const minimizeEdit: (
  text: string,
  newText: string
) => { startOffset: number; endOffset: number; insertedText: string } = (
  text,
  newText
) => {
  const length = Math.min(text.length, newText.length)
  let startSame = 0
  while (startSame < length) {
    if (text[startSame] !== newText[startSame]) {
      break
    }
    startSame++
  }
  let endSame = 1
  while (endSame < length - startSame) {
    if (text[text.length - endSame] !== newText[newText.length - endSame]) {
      break
    }
    endSame++
  }
  endSame--
  const startOffset = startSame
  const endOffset = text.length - endSame
  const insertedText = newText.slice(startSame, newText.length - endSame)
  return {
    startOffset,
    endOffset,
    insertedText,
  }
}

const toTextEdit = (
  source: string,
  {
    startOffset,
    endOffset,
    insertedText,
  }: {
    startOffset: number
    endOffset: number
    insertedText: string
  }
) => {
  const document = TextDocument.create('', '', -1, source)
  const textEdit: TextEdit = {
    range: {
      start: document.positionAt(startOffset),
      end: document.positionAt(endOffset),
    },
    newText: insertedText,
  }
  return textEdit
}

export type FormatDocumentResult =
  | {
      status: 'success'
      textEdits: TextEdit[]
    }
  | {
      status: 'ignored'
    }
  | {
      status: 'error'
    }
  | {
      status: 'cancelled'
    }

export const formatDocument: (
  source: string,
  filePath: string,
  languageId: string,
  token?: CancellationToken
) => Promise<FormatDocumentResult> = async (
  source,
  filePath,
  languageId,
  token
) => {
  filePath = fixPath(filePath, languageId)
  const isIgnoredPromise = getIsIgnored(filePath)
  const formatLanguagePromise = getFormatter(languageId)
  const optionsPromise = getOptions(filePath)
  const [isIgnored, formatLanguage, options] = await Promise.all([
    isIgnoredPromise,
    formatLanguagePromise,
    optionsPromise,
  ])
  if (!formatLanguage || isIgnored) {
    return {
      status: 'ignored',
    }
  }
  let formattedSource: string | undefined
  try {
    formattedSource = formatLanguage(format)(source, options)
  } catch (error) {
    return {
      status: 'error',
    }
  }
  if (formattedSource === undefined) {
    return {
      status: 'error',
    }
  }
  const minimizedEdit = minimizeEdit(source, formattedSource)
  const textEdit = toTextEdit(source, minimizedEdit)
  return {
    status: 'success',
    textEdits: [textEdit],
  }
}
