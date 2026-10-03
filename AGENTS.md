# Agent guidelines for devhints.io

## Commands

- **Dev server**: `pnpm dev` (requires Ruby for markdown caching)
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

Consult @_docs/writing-guidelines.md for formatting *.md files.
