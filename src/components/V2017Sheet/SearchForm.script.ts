import autocomplete from 'autocompleter'
import { fetchFuse, parseFuse } from '~/lib/fuseSearch/fuseSearch'

export async function setup(input: HTMLInputElement) {
  let fuse

  autocomplete<{ label: string; value: string }>({
    // Keep Enter as "search in place" on the landing page; suggestions are
    // still navigable by click or arrow keys.
    disableAutoSelect: input.hasAttribute('data-js-no-autoselect'),
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
