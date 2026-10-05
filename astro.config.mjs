import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'

/*
 * https://astro.build/config
 */
import tailwind from '@astrojs/tailwind'

// Allow tests to use a dedicated Vite cache. `astro build` runs Vite's dep
// optimizer on node_modules/.vite itself, so a dev server running alongside
// it loses the deps it is serving (504 "Outdated Optimize Dep").
const viteCacheDir = process.env.ASTRO_VITE_CACHE_DIR

// https://astro.build/config
export default defineConfig({
  site: 'https://devhints.io',
  build: {
    format: 'file' /* generate /my-post.html instead of /my-post/index.html */,
    inlineStylesheets: 'always'
  },
  prefetch: {
    prefetchAll: true
  },
  server: {
    host: true
  } /* access from https://192.168.x.x/ */,
  vite: {
    ...(viteCacheDir ? { cacheDir: viteCacheDir } : {}),
    optimizeDeps: {
      // SearchForm.script is only reached via a dynamic import, so its deps
      // are not in the initial scan; pre-bundle them so the dev server never
      // re-optimizes deps mid-session.
      include: ['autocompleter', 'fuse.js']
    }
  },
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    tailwind()
  ],
  markdown: {
    // Syntax highlighting is handled by render()
    syntaxHighlight: false
  }
})
