# Agent guidelines for devhints.io

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Test**: `pnpm test` (runs Vitest in watch mode)
- **Run single test**: `pnpm vitest run <file-path>` or `pnpm vitest <file-path>` (watch mode)
- **All tests (CI)**: `pnpm ci` (runs all linters, tests, and build)
- **Lint**: `pnpm eslint:check` or `pnpm prettier:check`
- **Format**: `pnpm format` (runs both ESLint and Prettier fixes)

## Code style

- **Package manager**: pnpm (v8.15.4+)
- **Framework**: Astro with TypeScript (strict mode), Tailwind CSS
- **Imports**: Use `~/` alias for `src/` directory; Prettier organizes imports automatically
- **Types**: Use Zod schemas for runtime validation (see `SheetFrontmatter.ts`); TypeScript strict mode enabled
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error handling**: Distinguish operational (expected) vs unexpected errors; return error objects for operational errors
- **Testing**: Vitest with globals enabled; use `it.each()` for repeated test cases; prefer object constants over helper functions

## Markdown files

Consult @_docs/writing-guidelines.md for formatting *.md files, and @_docs/markdown-dialect.md for the sheet syntax (attribute lists, tables, fences).

`pnpm ci` enforces three mechanical rules on every sheet (see `src/lib/sheetValidation/`):

- every H2 has at least one H3 (link footers like `## Also see` are exempt)
- code lines stay within 70 characters (42 inside `.-three-column` sections)
- tables with 8+ rows are separated with separator rows or H4 groups

Legacy findings are tracked in `src/lib/sheetValidation/baselines.ts`; new sheets start at zero. Regenerate after adding or fixing findings with `UPDATE_SHEET_BASELINE=1 pnpm vitest run src/lib/sheetValidation/updateBaseline.test.ts`.
