import type Fuse from 'fuse.js'
import type { Row } from './fuseSearch'

export const RESULT_LIMIT = 24

export const searchKeys: Fuse.FuseOptionKey<Row>[] = [
  { name: 'title', weight: 0.4 },
  { name: 'slug', weight: 0.25 },
  { name: 'keywords', weight: 0.15 },
  { name: 'headings', weight: 0.1 },
  { name: 'subtitle', weight: 0.07 },
  { name: 'category', weight: 0.03 }
]

export const searchOptions: Fuse.IFuseOptions<Row> = {
  keys: searchKeys,
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2
}
