# Developer notes

## Runtimes

Requires Node.js, Ruby and pnpm.

See `.node-version` and `.ruby-version` for supported versions, and the `packageManager` field in `package.json` for the pnpm version.

The site is built with [Astro](https://astro.build). Markdown is rendered by Ruby [kramdown](https://kramdown.gettalong.org/), so Bundler dependencies are needed for both the dev server and the build.

## Starting a local instance

This starts the Astro dev server. This requires recent versions of [Node.js], [pnpm], [Ruby] and [Bundler] installed.

```bash
pnpm install
bundle install
pnpm dev
```

The dev server runs at <http://localhost:4321>.

[node.js]: https://nodejs.org/en/download/package-manager/
[pnpm]: https://pnpm.io/
[ruby]: https://www.ruby-lang.org/en/documentation/installation/
[bundler]: https://bundler.io/

## Commands

| Command                | Description                       |
| ---                    | ---                               |
| `pnpm dev`             | Start the dev server              |
| `pnpm build`           | Build the site to `dist/`         |
| `pnpm test`            | Unit tests (Vitest, watch mode)   |
| `pnpm test:playwright` | End-to-end tests (Playwright)     |
| `pnpm test:ruby`       | Ruby tests                        |
| `pnpm ci`              | Run all linters, tests, and build |
| `pnpm format`          | Fix lint and formatting           |

Run a single unit test with `pnpm vitest run <path>`.

Site code lives in `src/`; cheatsheets are the Markdown files in the repository root.

## CSS classes

See <https://devhints.io/cheatsheet-styles> for a reference on styling.

## Cheatsheet guidelines

See `_docs/writing-guidelines.md` for content and formatting guidelines.

## Setting up redirects

Redirects are defined in `public/_redirects`, one rule per line:

```
/es2015 /es6 301
```

The file is copied into the build output, so static hosts that support the `_redirects` format will pick it up.

## Site configuration

Site-wide strings and settings live in `src/config.ts`: title, analytics, Disqus, announcements.

## Forking

It's a static site: `pnpm build` outputs `dist/`, which can be hosted anywhere. For a whitelabel fork, edit `src/config.ts` (title, analytics, Disqus, announcements) and the files in `public/` (`_redirects`, `_headers`).
