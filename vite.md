---
title: Vite
subtitle: Frontend dev server and bundler
logo: { set: logos, name: vitejs }
category: Build tools
updated: 2026-11-26
last_verified_with: "Vite 8.3.8, Node 26.13.1."
tier: t2
fragments:
  - "vite"
  - "vite build"
  - "vite preview"
  - "--host"
  - "vite.config.ts"
  - "defineConfig"
  - "plugins: []"
  - "server.proxy"
  - "import.meta.env"
  - "VITE_API_URL"
  - "--mode staging"
  - "import.meta.hot"
  - "hot.accept"
  - "lib:"
  - "resolve.alias"
  - "--base=/app/"
keywords:
  - vite
  - vite.config.ts
  - vite dev server
  - import.meta.env
  - HMR
intro: |
  [Vite](https://vite.dev) is a dev server and bundler for frontend apps: CLI, config, plugins, env vars and HMR.
links:
  - title: Vite documentation
    url: https://vite.dev/guide/
  - title: Config reference
    url: https://vite.dev/config/
  - title: GitHub repository
    url: https://github.com/vitejs/vite
---

## Getting started

### Scaffold

```bash
pnpm create vite my-app --template react-ts
```
<!-- {: data-highlight="create vite"} -->

Templates are `vanilla`, `vue`, `react`, `svelte`, `solid`, `preact`, `lit` and `qwik`, with `-ts` and `react-compiler` variants. Run `pnpm create vite` alone for prompts.

See: [Scaffolding](https://vite.dev/guide/#scaffolding-your-first-vite-project)

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

`vite` starts the dev server; `vite preview` serves the built `dist`.

See: [Command line](https://vite.dev/guide/cli)

### HTML entry

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```
<!-- {: data-highlight="main.js"} -->

`index.html` is the build entry and part of the module graph, so asset URLs are rebased automatically. `%MODE%`-style placeholders read env values; there is no `%PUBLIC_URL%`.

See: [index.html and project root](https://vite.dev/guide/#index-html-and-project-root)

## CLI

### Start dev server

```bash
vite --host 0.0.0.0 --port 5174
```
<!-- {: data-highlight="vite"} -->

#### Options

| Flag | Description |
| --- | --- |
| `--host [host]` | Listen on LAN addresses |
| `--port <port>` | Port, next free one if busy |
| `--open [path]` | Open the browser on start |
| `--strictPort` | Fail instead of picking a port |
| `--cors` | Allow cross-origin requests |
| `--force` | Re-bundle dependencies |

`vite dev` and `vite serve` are aliases. The default port is 5173.

See: [Dev server CLI](https://vite.dev/guide/cli#dev-server)

### Build

```bash
vite build --base=/app/ --sourcemap
```
<!-- {: data-highlight="vite build"} -->

#### Options

| Flag | Description |
| --- | --- |
| `--target <target>` | Transpile target |
| `--outDir <dir>` | Output directory, `dist` |
| `--minify [minifier]` | `oxc` by default, `false` to skip |
| `--manifest [name]` | Emit a build manifest |
| `--ssr [entry]` | Build a server entry |
| `--watch` | Rebuild on change |

Vite 8 bundles with Rolldown and minifies with Oxc. `--minify esbuild` and `terser` work only if you install them.

See: [Build CLI](https://vite.dev/guide/cli#build)

### Preview

```bash
vite build && vite preview --port 4173
```
<!-- {: data-highlight="vite preview"} -->

Serves the built `dist` locally with the dev server's request handling. Use a real static server or the framework's Node adapter for production.

See: [vite preview](https://vite.dev/guide/cli#vite-preview)

### Shared flags

| Flag | Description |
| --- | --- |
| `-c, --config <file>` | Use another config file |
| `-m, --mode <mode>` | Set the env mode |
| `--base <path>` | Public base path |
| `-l, --logLevel <level>` | `info`, `warn`, `error`, `silent` |
| `-d, --debug [feat]` | Print debug logs |
| `--profile [name]` | Write `<name>.cpuprofile` |

These work on `vite`, `vite build` and `vite preview`.

See: [CLI reference](https://vite.dev/guide/cli)

## Configure

### Config file

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'app',
  base: '/docs/',
  plugins: [],
})
```
<!-- {: data-highlight="defineConfig"} -->

Vite reads `vite.config.ts` from the project root, or `.js`, `.mjs`, `.mts`, `.cjs`, `.cts`. `-c` points at another file.

See: [Configuring Vite](https://vite.dev/config/)

### Aliases

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```
<!-- {: data-highlight="alias"} -->

Filesystem aliases need absolute paths; a relative value is used as-is instead of being resolved. Also add the path to `tsconfig.json` `paths` for editor types.

See: [resolve.alias](https://vite.dev/config/shared-options#resolve-alias)

### Conditional config

```ts
export default defineConfig(({ command, mode }) => ({
  build: { sourcemap: mode !== 'production' },
  define: {
    __DEV__: JSON.stringify(command === 'serve'),
  },
}))
```
<!-- {: data-highlight="({ command, mode })"} -->

`command` is `serve` or `build`; `mode` comes from `--mode`. `isSsrBuild` marks `vite build --ssr`, and `isPreview` marks `vite preview`.

See: [Conditional config](https://vite.dev/config/#conditional-config)

### Define constants

```ts
export default defineConfig({
  define: {
    __VERSION__: JSON.stringify('8.3.8'),
  },
})
```
<!-- {: data-highlight="define"} -->

Values replace matching identifiers at build time, so strings need `JSON.stringify`. Only add globals no library already owns.

See: [define](https://vite.dev/config/shared-options#define)

## Plugins

### Use a plugin

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
})
```
<!-- {: data-highlight="plugins: [react()]"} -->

Falsy entries are skipped, so `plugins: [react(), !isProd && devtools()]` works. A preset may return an array, which is flattened.

See: [Using plugins](https://vite.dev/guide/using-plugins)

### Framework plugins

| Plugin | Framework |
| --- | --- |
| `@vitejs/plugin-react` | React, Oxc |
| `@vitejs/plugin-react-swc` | React, SWC |
| `@vitejs/plugin-vue` | Vue |
| `@sveltejs/vite-plugin-svelte` | Svelte |
| `vite-plugin-solid` | Solid |
| `@preact/preset-vite` | Preact |
<!-- {: .-headers} -->

Astro, Nuxt and SvelteKit wrap Vite and take their own framework config instead.

See: [Vite plugin registry](https://registry.vite.dev/plugins)

### Transform files

```ts
{
  name: 'txt-loader',
  transform: {
    filter: { id: /\.txt$/ },
    handler(src) {
      return { code: `export default ${JSON.stringify(src)}` }
    },
  },
}
```
<!-- {: data-highlight="transform"} -->

`enforce: 'pre'` runs before Vite's core plugins; `'post'` after them but before minify. Hooks receive only files matching `filter`.

See: [Plugin API](https://vite.dev/guide/api-plugin)

### Dev middleware

```ts
{
  name: 'hello',
  configureServer(server) {
    server.middlewares.use('/hello', (req, res) => {
      res.end('hi')
    })
  },
}
```
<!-- {: data-highlight="configureServer"} -->

Middleware registered here runs before Vite's own, so it sees requests first. Return a function from the hook to add middleware after them instead.

See: [configureServer](https://vite.dev/guide/api-plugin#configureserver)

### Vite hooks

| Hook | Runs |
| --- | --- |
| `config` | Before the config resolves |
| `configResolved` | With the final config |
| `configureServer` | On dev server setup |
| `transformIndexHtml` | On each HTML entry |
| `hotUpdate` | To customise HMR updates |

Rolldown hooks (`resolveId`, `load`, `transform`) also run in dev, one module at a time.

See: [Vite-specific hooks](https://vite.dev/guide/api-plugin#vite-specific-hooks), [hotUpdate](https://vite.dev/guide/api-environment-plugins#the-hotupdate-hook)

## Dev server

### Server options

```ts
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: '/docs/',
  },
})
```
<!-- {: data-highlight="server"} -->

#### Defaults

| Option | Default |
| --- | --- |
| `host` | `localhost` |
| `port` | `5173` |
| `strictPort` | `false` |
| `cors` | localhost origins only |
| `allowedHosts` | `[]` |
<!-- {: .-headers} -->

`host: true` binds all addresses. A busy port moves to the next one unless `strictPort` is set.

See: [Server options](https://vite.dev/config/server-options)

### Proxy

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```
<!-- {: data-highlight="proxy"} -->

Matching requests bypass Vite's transforms, so `/api/users` reaches `/users` on the target. Keys starting with `^` are regexes; add `ws: true` for sockets.

See: [server.proxy](https://vite.dev/config/server-options#server-proxy)

### HTTPS

```ts
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    https: {},
  },
})
```
<!-- {: data-highlight="https: {}"} -->

`https` takes `https.createServer` options, so it needs a `key` and `cert`. `basicSsl()` mints and caches a self-signed pair for local work. The HTTPS server skips the host allow-list.

See: [server.https](https://vite.dev/config/server-options#server-https)

### Allowed hosts

```ts
export default defineConfig({
  server: {
    allowedHosts: ['.example.com'],
  },
})
```
<!-- {: data-highlight="allowedHosts"} -->

Other hostnames are rejected in dev. `localhost` and IP addresses are always allowed, a leading dot covers subdomains, and `true` disables the DNS-rebinding check.

See: [server.allowedHosts](https://vite.dev/config/server-options#server-allowedhosts)

## Build

### Output

```ts
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    sourcemap: true,
  },
})
```
<!-- {: data-highlight="outDir"} -->

Files under 4 KiB inline as base64. Hashed names land in `dist/assets`, and `--emptyOutDir` lets the build clear a directory outside the root.

See: [Build options](https://vite.dev/config/build-options)

### Target

```ts
export default defineConfig({
  build: {
    target: ['chrome111', 'safari16.4'],
  },
})
```
<!-- {: data-highlight="target"} -->

The default `baseline-widely-available` means Chrome 111, Edge 111, Firefox 114, Safari 16.4 and iOS 16.4. `esnext` skips lowering.

See: [build.target](https://vite.dev/config/build-options#build-target)

### Code splitting

```ts
export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'vendor', test: /node_modules/ }],
        },
      },
    },
  },
})
```
<!-- {: data-highlight="codeSplitting"} -->

`build.rollupOptions` is the deprecated alias for `build.rolldownOptions`. Groups take `minSize`, `maxSize`, `priority` and `test`.

See: [codeSplitting](https://rolldown.rs/reference/OutputOptions.codeSplitting)

### Library mode

```ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-lib.${format}.js`,
    },
  },
})
```
<!-- {: data-highlight="lib"} -->

Writes `my-lib.es.js` and `my-lib.umd.js`. `name` is the global and is only needed for `umd` and `iife` output.

See: [Library mode](https://vite.dev/guide/build#library-mode)

### Server builds

```bash
vite build --ssr src/entry-server.js
```
<!-- {: data-highlight="--ssr"} -->

Writes `dist/entry-server.js`, or `.mjs` when `package.json` has no `"type": "module"`. `--ssrManifest` on the client build emits `.vite/ssr-manifest.json`.

See: [SSR](https://vite.dev/guide/ssr)

## Environment variables

### Built-in constants

```js
import.meta.env.MODE // 'development' in dev
import.meta.env.PROD // false unless NODE_ENV=production
import.meta.env.DEV // true unless NODE_ENV=production
import.meta.env.SSR // false in the client build
import.meta.env.BASE_URL // '/' from `base`
```
<!-- {: data-highlight="import.meta.env"} -->

`PROD` follows `NODE_ENV`, so `NODE_ENV=production vite` flips it. Builds replace these constants, so guarded blocks are tree-shaken.

See: [Built-in constants](https://vite.dev/guide/env-and-mode#built-in-constants)

### .env files

```ini
# .env
VITE_API_URL=https://api.example.com
DB_PASSWORD=secret
```
<!-- {: data-highlight="VITE_API_URL"} -->

Only `VITE_`-prefixed names reach the client; `import.meta.env.DB_PASSWORD` is `undefined`. `.env.local` and `.env.[mode]` layer on top, and exported shell vars win.

See: [.env files](https://vite.dev/guide/env-and-mode#env-files)

### Modes

```bash
vite build --mode staging
```
<!-- {: data-highlight="--mode staging"} -->

#### Mode and NODE_ENV

| Command | NODE_ENV | Mode |
| --- | --- | --- |
| `vite build` | `production` | `production` |
| `vite build --mode staging` | `production` | `staging` |
| `NODE_ENV=development vite build` | `development` | `production` |
<!-- {: .-headers} -->

The mode picks `.env.[mode]`. `NODE_ENV` drives `DEV` and `PROD`, and the two are independent.

See: [Modes](https://vite.dev/guide/env-and-mode#modes)

### Env prefix and directory

```ts
export default defineConfig({
  envPrefix: 'APP_',
  envDir: '../',
})
```
<!-- {: data-highlight="envPrefix; envDir"} -->

`envPrefix` replaces the `VITE_` prefix and accepts an array. `envDir` sets the directory those files are read from, relative to the project root.

See: [envPrefix](https://vite.dev/config/shared-options#envprefix)

### Read env in config

```ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: { __API__: JSON.stringify(env.VITE_API_URL) },
  }
})
```
<!-- {: data-highlight="loadEnv"} -->

Config files do not get `import.meta.env`. `loadEnv` reads the same files, and a third argument of `''` skips the prefix filter.

See: [Using env in config](https://vite.dev/config/#using-environment-variables-in-config)

### Typed vars

#### src/vite-env.d.ts

```ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```
<!-- {: data-highlight="ImportMetaEnv"} -->

Keep this file free of imports, or the augmentation stops applying to `import.meta.env`.

See: [TypeScript IntelliSense](https://vite.dev/guide/env-and-mode#intellisense-for-typescript)

## HMR

### Self-accept

```js
export let count = 0

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    console.log('count is now', mod?.count)
  })
}
```
<!-- {: data-highlight="import.meta.hot.accept"} -->

Edits bubble up to the nearest `import.meta.hot.accept` boundary; without one, Vite reloads the page. `mod` is `undefined` when the update fails to compile, and the call must appear literally as `import.meta.hot.accept(`.

See: [hot.accept](https://vite.dev/guide/api-hmr#hot-accept-cb), [HMR boundaries](https://vite.dev/guide/features#hot-module-replacement)

### Accept a dependency

```js
import { render } from './render.js'

render()

if (import.meta.hot) {
  import.meta.hot.accept('./render.js', (mod) => {
    mod?.render()
  })
}
```
<!-- {: data-highlight="hot.accept('./render.js'"} -->

Pass an array to accept several dependencies; only the updated module arrives non-null in the callback.

See: [hot.accept(deps)](https://vite.dev/guide/api-hmr#hot-accept-deps-cb)

### Preserve state

```js
let ticks = import.meta.hot?.data.ticks ?? 0
const timer = setInterval(() => {
  ticks += 1
}, 1000)

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose((data) => {
    data.ticks = ticks
    clearInterval(timer)
  })
}
```
<!-- {: data-highlight="dispose"} -->

`dispose` runs before the module is replaced. Values on `import.meta.hot.data` survive into the next instance, so keep mutable state there.

See: [hot.dispose](https://vite.dev/guide/api-hmr#hot-dispose-cb)

### Force a reload

```js
export const needsFullReload = false

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    if (!mod || mod.needsFullReload) {
      import.meta.hot.invalidate()
    }
  })
}
```
<!-- {: data-highlight="invalidate"} -->

`invalidate()` pushes the update to importers as if this module never accepted; `hot.decline()` is a no-op kept for compatibility.

See: [hot.invalidate](https://vite.dev/guide/api-hmr#hot-invalidate-message-string)

### WebSocket options

```ts
export default defineConfig({
  server: {
    hmr: { overlay: false },
    ws: { protocol: 'wss', port: 3001 },
  },
})
```
<!-- {: data-highlight="ws"} -->

`hmr.overlay: false` hides the error overlay. Socket options moved to `server.ws`; the old `server.hmr` fields are deprecated but still synced.

See: [server.ws](https://vite.dev/config/server-options#server-ws)

## Also see

[Webpack cheatsheet](./webpack)
<!-- {: .-crosslink} -->

[Rollup.js cheatsheet](./rollup)
<!-- {: .-crosslink} -->
