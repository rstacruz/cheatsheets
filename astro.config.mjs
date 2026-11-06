import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'

// Allow tests to use a dedicated Vite cache. `astro build` runs Vite's dep
// optimizer on node_modules/.vite itself, so a dev server running alongside
// it loses the deps it is serving (504 "Outdated Optimize Dep").
const viteCacheDir = process.env.ASTRO_VITE_CACHE_DIR

// https://astro.build/config
export default defineConfig({
  site: 'https://devhints.io',
  compressHTML: true,
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
    // `css.transformer` is unset: Vite parses raw CSS before @tailwindcss/vite
    // resolves @apply/@reference (tailwindlabs/tailwindcss#14205)
    build: {
      // Nesting is lowered for safari16.4; the esnext server build skips it
      // Values from Vite's ESBUILD_BASELINE_WIDELY_AVAILABLE_TARGET
      cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4']
    },
    ...(viteCacheDir ? { cacheDir: viteCacheDir } : {}),
    plugins: [tailwindcss()],
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
    })
  ],
  markdown: {
    // Syntax highlighting is handled by render()
    syntaxHighlight: false
  }
})
