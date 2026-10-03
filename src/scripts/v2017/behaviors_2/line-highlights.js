/*
 * Behavior: Add line highlight overlays to `pre[data-line]` blocks
 *
 * The code is highlighted at build time, so Prism's line-highlight plugin never
 * fires. This positions its overlays directly: one absolutely-positioned
 * `.line-highlight` per line range, offset by the pre's padding-top.
 */

// Browsers disagree on whether fractional line-heights get rounded:
// 13px * 1.5 measures as 39px (not rounded) or 38px (rounded).
const ROUNDED_LINE_HEIGHT = (() => {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:absolute;visibility:hidden;font-size:13px;line-height:1.5;padding:0;border:0'
  probe.innerHTML = '&nbsp;<br>&nbsp;'
  document.body.appendChild(probe)
  const rounded = probe.offsetHeight === 38
  probe.remove()
  return rounded
})()

function getLineHeight(pre) {
  const parse = ROUNDED_LINE_HEIGHT ? parseInt : parseFloat
  return parse(getComputedStyle(pre).lineHeight)
}

function getLineCount(code) {
  return (code.textContent.match(/\n(?!$)/g) || []).length + 1
}

function parseRanges(spec) {
  return spec
    .replace(/\s+/g, '')
    .split(',')
    .filter(Boolean)
    .map((range) => {
      const [start, end] = range.split('-')
      return { start: Number(start), end: Number(end) || Number(start) }
    })
}

function highlightLines(pre, code) {
  const lineHeight = getLineHeight(pre)
  if (!Number.isFinite(lineHeight) || lineHeight <= 0) return

  const lineCount = getLineCount(code)
  const paddingTop = parseFloat(getComputedStyle(pre).paddingTop)
  const width = pre.scrollWidth
  const ranges = parseRanges(pre.getAttribute('data-line') || '')

  for (const { start, end } of ranges) {
    const last = Math.min(end, lineCount)
    if (!Number.isFinite(start) || start < 1 || last < start) continue

    const highlight = document.createElement('div')
    highlight.className = 'line-highlight'
    highlight.setAttribute('aria-hidden', 'true')
    highlight.setAttribute('data-start', String(start))
    if (last > start) highlight.setAttribute('data-end', String(last))
    highlight.style.top = `${paddingTop + (start - 1) * lineHeight}px`
    highlight.style.height = `${(last - start + 1) * lineHeight}px`
    highlight.style.marginTop = '0'
    if (width > 0) highlight.style.width = `${width}px`
    pre.appendChild(highlight)
  }
}

export function setupLineHighlights() {
  renderLineHighlights()

  // Line heights track the theme's fluid body font-size, so re-measure on resize
  let timer
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(renderLineHighlights, 150)
  })
}

function renderLineHighlights() {
  document.querySelectorAll('pre[data-line]').forEach((pre) => {
    pre.querySelectorAll(':scope > .line-highlight').forEach((el) => {
      el.remove()
    })

    const code = pre.querySelector('code')
    if (!code) return

    if (getComputedStyle(pre).position === 'static') {
      pre.style.position = 'relative'
    }

    highlightLines(pre, code)
  })
}
