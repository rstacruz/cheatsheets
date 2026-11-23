# Agent guidelines for devhints.io

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Test**: `pnpm test` (runs Vitest in watch mode)
- **Run single test**: `pnpm vitest run <file-path>` or `pnpm vitest <file-path>` (watch mode)
- **All tests (CI)**: `pnpm run ci` (runs all linters, tests, and build)
- **Lint**: `pnpm lint:check` (oxlint; `.astro` templates are not covered)
- **Format**: `pnpm fmt:check` reports differences, `pnpm format` fixes them (oxfmt + `oxlint --fix`)

## Code style

- **Package manager**: pnpm (v12)
- **Framework**: Astro with TypeScript (strict mode), Tailwind CSS
- **Imports**: Use `~/` alias for `src/` directory
- **Styles**: plain CSS partials in `src/styles/`; Tailwind utilities in markup
- **CSS tokens**: colours, type, radii, and `@apply` rules live in [`_docs/css-conventions.md`](_docs/css-conventions.md)
- **Types**: Use Zod schemas for runtime validation (see `SheetFrontmatter.ts`); TypeScript strict mode enabled
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error handling**: Distinguish operational (expected) vs unexpected errors; return error objects for operational errors
- **Testing**: Vitest with globals enabled; use `it.each()` for repeated test cases; prefer object constants over helper functions

## Sheet authoring

Consult @_docs/writing-guidelines.md for formatting *.md files, @_docs/markdown-dialect.md for the sheet syntax (attribute lists, tables, fences), @_docs/archiving.md for when to archive a sheet, and @_docs/tiers.md for review cadence. Reviewers and skills refer to rules by stable slugs such as `tables/shortcut-keys`.

Verify example outputs against the runtime: run the snippet, capture its real output, and paste it verbatim; watch for NBSP and other invisible characters.

Sheet checks live in `src/lib/sheetValidation/`. Run them with `pnpm vitest run src/lib/sheetValidation`; check names follow their rule slugs.
