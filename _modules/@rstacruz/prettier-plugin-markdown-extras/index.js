const prettierMarkdown = require('prettier/parser-markdown')

module.exports = {
  parsers: {
    markdown: {
      ...prettierMarkdown.parsers.markdown,
      preprocess(text, options) {
        let result = prettierMarkdown.parsers.markdown.preprocess(text, options)
        result = convertToCodeFences(result)
        return result
      }
    }
  }
}

function convertToCodeFences(input) {
  let source = input
  source = source.replace(/\n((\n+    [^\n]+)+)/g, (match) => {
    const dedented = match.replace(/\n    /g, '\n').trim()
    return '\n\n```\n' + dedented + '\n```'
  })
  return source
}
