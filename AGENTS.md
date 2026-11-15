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
- **Types**: Use Zod schemas for runtime validation (see `SheetFrontmatter.ts`); TypeScript strict mode enabled
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error handling**: Distinguish operational (expected) vs unexpected errors; return error objects for operational errors
- **Testing**: Vitest with globals enabled; use `it.each()` for repeated test cases; prefer object constants over helper functions

## Markdown files

Consult @_docs/writing-guidelines.md for formatting *.md files, and @_docs/markdown-dialect.md for the sheet syntax (attribute lists, tables, fences).

Sheet checks live in `src/lib/sheetValidation/`. Run them with `pnpm vitest run src/lib/sheetValidation`.
