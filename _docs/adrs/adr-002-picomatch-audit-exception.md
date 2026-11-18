# ADR 002 — Accepted picomatch audit advisory

- **Status:** Accepted — 2026-11-18

## Context

`pnpm audit` reports GHSA-fc5q-39xc-vjpf (high, ReDoS). Every published
picomatch version (<= 4.0.7) is affected; upstream PR
[micromatch/picomatch#194](https://github.com/micromatch/picomatch/pull/194)
has no release. All 24 dependency paths are build/test tooling (vite,
tinyglobby, vitest, Astro internals, `unstorage → anymatch`) globbing local
source and asset paths. The site builds static files with no Node adapter,
`output: 'server'`, or user-supplied globs, so no request can reach the
vulnerable code in production.

## Decision

Ignore only GHSA-fc5q-39xc-vjpf via `audit.ignore` in `pnpm-workspace.yaml`.
Keep the existing `picomatch@<2.3.2` override — it fixes a different, older
advisory. No version override or patch for this advisory: none exists.

## Consequences

- No production exposure today; a pathological local glob can stall a build
  or CI job.
- Other advisories still fail `pnpm audit` at the same levels.
- Recheck when a patched picomatch ships or when a Node adapter or
  user-controlled glob is introduced; then remove the ignore and this ADR.

## Alternatives

- **Raise `audit.level` to critical, or use `--ignore-unfixable`:** hides
  future high/moderate findings, including patchable ones.
- **Override picomatch to 4.0.7:** already resolved; a no-op implying a fix
  that does not exist.
- **Fork or patch-package picomatch:** ongoing supply-chain cost worse than a
  build-only ReDoS.
