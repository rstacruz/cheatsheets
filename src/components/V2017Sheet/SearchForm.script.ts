import autocomplete from 'autocompleter'
import { fetchFuse, parseFuse } from '~/lib/fuseSearch/fuseSearch'

export async function setup(input: HTMLInputElement) {
  let fuse

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
