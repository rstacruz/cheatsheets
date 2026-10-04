/**
 * CommonMark syntax primitives shared by the render pipeline
 * (src/lib/markdown/) and the sheet checks: where blocks start and where
 * fenced code runs. Keep this module free of test-only helpers.
 */

export const BLOCK_START =
  /^(?:[#>|{}]|[-*+](\s|$)|\d+[.)](\s|$)|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/

export const LINK_DEFINITION = /^\[[^\]]*\]:/

// CommonMark HTML block starts (types 1-6)
export const HTML_BLOCK =
  /^<(?:!--|\?|!\[CDATA\[|!DOCTYPE|\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>))/i

// A list marker before a continuation does not end the paragraph
// (`* item\n  continued`), so it is not a block start here
export const PREV_BLOCK_START = /^(?:[#>|{}]|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/

export const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/

/** Fence membership and opening indent, following CommonMark's fence rules */
export function scanFences(lines: string[]) {
  const fenced = new Array<boolean>(lines.length).fill(false)
  const indent = new Array<number>(lines.length).fill(0)
  let fence: string | null = null
  let opener = 0

  lines.forEach((line, index) => {
    const match = FENCE_LINE.exec(line)
    if (fence) {
      fenced[index] = true
      indent[index] = opener
      // A closing fence needs at least as many characters as the opener
      if (
        match &&
        match[2][0] === fence[0] &&
        match[2].length >= fence.length &&
        match[3].trim() === ''
      ) {
        fence = null
      }
    } else if (match && (match[2][0] === '~' || !match[3].includes('`'))) {
      fence = match[2]
      opener = match[1].length
      fenced[index] = true
      indent[index] = opener
    }
  })

  return { fenced, indent }
}
