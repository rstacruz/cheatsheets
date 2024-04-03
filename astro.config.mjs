import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'

/*
 * https://astro.build/config
 */
import tailwind from '@astrojs/tailwind'

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
