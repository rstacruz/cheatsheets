import autocomplete from 'autocompleter'
import { fetchFuse, parseFuse } from '~/lib/fuseSearch/fuseSearch'

export async function setup(input: HTMLInputElement) {
  let fuse

  const form = input.closest('form')
  const icon = form?.querySelector<HTMLElement>('[data-js-search-icon]')
  const button = form?.querySelector<HTMLButtonElement>(
    '[data-js-search-submit]'
  )

  if (button && icon) {
    const sync = () => {
      const active = input.value.trim().length > 0
      icon.style.display = active ? 'none' : 'grid'
      button.style.display = active ? 'inline-flex' : 'none'
    }
    sync()
    input.addEventListener('input', sync)
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const query = input.value.trim()
      if (query) location.assign(`/search?q=${encodeURIComponent(query)}`)
    })
  }

  autocomplete<{ label: string; value: string }>({
    input,
    fetch: async (text: string, update) => {
      fuse ??= parseFuse(await fetchFuse())

      const rows: Array<{ item: { title: string; slug: string } }> =
        fuse.search(text, { limit: 10 })

      update(
        rows.map((row) => ({ label: row.item.title, value: row.item.slug }))
      )
    },
    onSelect: (item) => {
      // ^ { label, value }
      const slug = item.value
      window.location.href = `/${slug}`
    }
  })
}
