---
title: How to deploy SvelteKit with Node
link_title: SvelteKit Node deploy
subtitle: Run a Node server
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1, Node 22.23.5, 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: adapter-node
    url: https://svelte.dev/docs/kit/adapter-node
---

## Node deployment
<!-- {: .-snippets} -->

### Install the adapter
<!-- {: .-snippet} -->

```sh
npm i -D @sveltejs/adapter-node
```
<!-- {: data-highlight="adapter-node"} -->

**Adds a Node adapter.** Other adapters target serverless and static hosts. See [Adapters](https://svelte.dev/docs/kit/adapters).

### Configure the adapter
<!-- {: .-snippet} -->

#### vite.config.ts

```ts
import adapter from '@sveltejs/adapter-node'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter() })]
})
```
<!-- {: data-highlight="sveltekit({ adapter"} -->

**Builds a standalone server.** SvelteKit 3 takes the adapter in the Vite plugin; see [adapter-node](https://svelte.dev/docs/kit/adapter-node).

### Build and start
<!-- {: .-snippet} -->

```sh
npm run build
node build
```
<!-- {: data-highlight="node build"} -->

**Runs the output.** It starts on port 3000, and the server needs `package.json` and production dependencies. See [Deploying](https://svelte.dev/docs/kit/adapter-node#Deploying).

### Set the port and origin
<!-- {: .-snippet} -->

```sh
PORT=8080 ORIGIN=https://example.com \
  node build
```
<!-- {: data-highlight="ORIGIN="} -->

**Overrides the defaults at runtime.** `ORIGIN` is the trusted origin for CSRF checks behind a proxy; required `src/env.ts` variables must be set too; see [Environment variables](https://svelte.dev/docs/kit/adapter-node#Environment-variables).

### Build a Docker image
<!-- {: .-snippet} -->

```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit dev
COPY --from=build /app/build ./build
ENV PORT=3000
CMD ["node", "build"]
```
<!-- {: data-highlight="npm ci --omit dev"} -->

**Keeps the runtime image small.** Copy `build/` plus production dependencies, then run `node build`; see [Deploying](https://svelte.dev/docs/kit/adapter-node#Deploying).
