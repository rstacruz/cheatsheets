const isProd = Boolean(import.meta.env.PROD)

export const site = {
  url: 'https://devhints.io',
  title: 'Devhints.io cheatsheets'
} as const

export const disqus = {
  enabled: true,
  host: 'devhints.disqus.com'
} as const

export const googleAnalytics = {
  enabled: isProd,
  measurementId: 'G-N7TC6B227L'
} as const

export const github = {
  repositoryUrl: 'https://github.com/rstacruz/cheatsheets',
  branch: 'master'
} as const

export const urls = {
  newCheatsheetUrl:
    'https://github.com/rstacruz/cheatsheets/issues/new?template=request-cheatsheet.yml'
} as const

export const carbon = {
  enabled: isProd,
  // src: 'https://cdn.carbonads.com/carbon.js?serve=CE7IK5QM&placement=devhintsio'
  src: 'https://pubsrv.devhints.io/carbon.js?serve=CE7IK5QM&placement=devhintsio',
  // Cover format, A/B tested against the zone above
  coverSrc:
    'https://pubsrv.devhints.io/carbon.js?serve=CWYIL2JI&placement=devhintsio&format=cover'
} as const

// Nav order. Every category except Others holds 3-16 sheets; Others holds at
// most 12. Enforced by src/lib/categories.test.ts.
export const categories = [
  'Agents',
  'Task automation',
  'JavaScript',
  'Browser APIs',
  'JavaScript libraries',
  'JavaScript testing',
  'Build tools',
  'Node.js',
  'CSS',
  'HTML',
  'Markup',
  'CLI',
  'Shell',
  'Command line recipes',
  'Networking',
  'Media tools',
  'Package managers',
  'Vim',
  'Git',
  'Devops',
  'Databases',
  'API',
  'Linux',
  'Ruby',
  'Rails',
  'Ruby libraries',
  'Python',
  'Elixir',
  'C-like',
  'Apps',
  'Ansible',
  'Jekyll',
  'Plain-text accounting',
  'Others'
]

export const announcement = {
  id: '2026-10-03',
  title: `From the blog`,
  body: `I've started a new blog with some insights on web development. Have a look! [**ricostacruz.com/posts**](https://ricostacruz.com/posts?utm_source=devhints)`,
  // Display probability; bump `id` when retuning (existing visitors keep their roll).
  chance: 0.05
}
