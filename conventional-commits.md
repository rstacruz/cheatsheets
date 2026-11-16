---
title: Conventional Commits
subtitle: Structured messages that drive releases
category: Git
tier: t2
fragments:
  - "feat:"
  - "fix:"
  - "feat(lang):"
  - "fix(parser):"
  - "BREAKING CHANGE:"
  - "docs:"
  - "refactor:"
  - "perf:"
  - "test:"
  - "build:"
  - "ci:"
  - "chore:"
  - "style:"
  - "revert:"
updated: 2026-11-16
intro: |
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is a
  commit message convention that maps commits to SemVer releases.

  This reference covers the message grammar, the recommended types,
  breaking-change markers, and the tooling that reads them.
links:
  - title: Conventional Commits 1.0.0
    url: https://www.conventionalcommits.org/en/v1.0.0/
  - title: commitlint
    url: https://commitlint.js.org/
  - title: semantic-release
    url: https://semantic-release.org/
---

## Message format

### Anatomy

```
<type>(<scope>)!: <description>

[optional body]

[optional footer(s)]
```

#### Fields

| Part | Required | Notes |
| --- | --- | --- |
| `type` | yes | noun such as `feat` or `fix` |
| `scope` | no | codebase section, inside `()` |
| `!` | no | breaking change marker, before `:` |
| `description` | yes | short summary after `: ` |
| body | no | free-form, after one blank line |
| footers | no | token/value pairs after the body |

<!-- {: .-headers} -->

The colon and space after the prefix are required, so `feat:add` does not
parse. The `!` sits immediately before the colon.

See: [Specification summary](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### Types

| Type | Signals | Semver |
| --- | --- | --- |
| `feat` | adds a feature | MINOR |
| `fix` | patches a bug | PATCH |
| --- | --- | --- |
| `docs` | documentation only | none |
| `style` | formatting, no code change | none |
| `refactor` | neither fix nor feature | none |
| `perf` | faster code | none |
| `test` | tests added or fixed | none |
| `build` | build system or deps | none |
| `ci` | CI config and scripts | none |
| `chore` | other changes outside src and tests | none |
| `revert` | undoes an earlier commit | none |

<!-- {: .-headers} -->

Only `feat` and `fix` have spec-defined meanings. The rest are the
`@commitlint/config-conventional` set; additional types are allowed, but they
carry no semver meaning unless marked breaking.

See: [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

### Scopes

```
feat(lang): add Polish language
fix(parser): handle empty input
docs(api): document the retry option
```

A scope names the section of the codebase: a package, module, or route.
Parentheses are required. Parsers treat type and scope as case-insensitive, so
pick one casing and keep it.

See: [Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)

### Body and footers

```
fix: prevent racing of requests

Dismiss responses that are not from the latest request.

Reviewed-by: Z
Refs: #123
Closes #124
```

#### Footer tokens

| Footer | Signals |
| --- | --- |
| `Refs: #123` | related issue or commit |
| `Closes #123` | closes the issue on merge |
| `Reviewed-by: Z` | reviewer trailer |
| `BREAKING CHANGE: …` | breaking change, uppercase |

<!-- {: .-headers} -->

Body and footers each start after one blank line. Tokens replace spaces with
`-`, except `BREAKING CHANGE`; a value may span lines until the next token.
`BREAKING-CHANGE` is a synonym.

See: [git interpret-trailers](https://git-scm.com/docs/git-interpret-trailers)

### Breaking changes

| Form | Example |
| --- | --- |
| `!` before `:` | `feat!: drop Node 6 support` |
| Footer | `BREAKING CHANGE: drop Node 6 support` |
| Both | `feat(api)!: drop Node 6` plus a footer |

<!-- {: .-headers} -->

The footer form is uppercase and works with any type. With `!` alone, the
description must describe the break. Both forms may appear together.

See: [Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)

## Writing commits

### Multi-paragraph messages

```
fix: prevent racing of requests

Introduce a request id and a reference to the latest
request. Dismiss incoming responses other than the
latest.

Remove timeouts used to mitigate the racing issue.

Reviewed-by: Z
Refs: #123
```

#### One flag per paragraph

```bash
git commit \
  -m 'fix: prevent racing of requests' \
  -m 'Dismiss stale responses by request id.' \
  -m 'Reviewed-by: Z'
```

Each `-m` becomes a paragraph, separated by a blank line, so a body and footers
fit without an editor.

See: [Examples](https://www.conventionalcommits.org/en/v1.0.0/#examples)

### Reverts

```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

The spec leaves revert handling to tooling, and recommends this shape: a
`revert` type plus a footer naming the reverted SHAs. `git revert` writes
`Revert "..."`, which does not parse, so reword the subject.

See: [Revert commits](https://www.conventionalcommits.org/en/v1.0.0/#how-does-conventional-commits-handle-revert-commits)

### Merge and squash commits

```bash
# Squash: the commit subject is the PR title
git merge --squash feature/login
git commit -m 'feat(auth): add login with SSO'

# Merge commit: pass a conventional subject
git merge --no-ff feature/login -m 'feat(auth): add SSO'
```

A squash leaves one commit, so the PR title carries the type. Plain merge
commits do not parse, and tools skip them. Contributors can commit freely when
a maintainer edits the squash message.

See: [Contributor workflow](https://www.conventionalcommits.org/en/v1.0.0/#do-all-my-contributors-need-to-use-the-conventional-commits-specification)

## Versioning

### Semver

Each commit maps to a release bump, and tools pick the highest one since the
last tag.

[Semver cheatsheet](./semver)
<!-- {: .-crosslink} -->

See: [Semantic Versioning](https://semver.org/)

### Mapping to semver

| Commits since last release | Bump | Example |
| --- | --- | --- |
| `fix:` only | PATCH | 1.2.3 → 1.2.4 |
| any `feat:`, no break | MINOR | 1.2.3 → 1.3.0 |
| `!` or `BREAKING CHANGE:` | MAJOR | 1.2.3 → 2.0.0 |

<!-- {: .-headers} -->

The highest bump wins, so a breaking `fix:` is still a major release. Breaking
changes count whatever the commit type.

See: [Conventional Commits and SemVer](https://www.conventionalcommits.org/en/v1.0.0/#how-does-this-relate-to-semver)

### Release tools

| Tool | Command | Behaviour |
| --- | --- | --- |
| [semantic-release](https://semantic-release.org/) | `npx semantic-release` | tags and publishes |
| [standard-version](https://github.com/conventional-changelog/standard-version) | `npx standard-version` | bumps files, writes changelog |
| [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) | `npx commit-and-tag-version` | maintained fork of standard-version |

<!-- {: .-headers} -->

semantic-release runs on the release branch after CI. standard-version is
deprecated: its README recommends release-please, while the fork keeps the same
local workflow.

See: [semantic-release docs](https://semantic-release.org/)

### Parsing with git log

```bash
# Subjects since the last tag
git log --no-merges --format='%s' v1.2.0..HEAD

# Count each type
git log --no-merges --format='%s' v1.2.0..HEAD |
  sed -nE 's/^([a-zA-Z]+)(\([^)]*\))?!?: .+/\1/p' |
  sort | uniq -c | sort -rn
```

Replace the range with your last tag. The expression drops the scope and `!`
and skips subjects that do not parse, so the output is a count per type.

See: [git log](https://git-scm.com/docs/git-log)

## Tooling

### commitlint

#### commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['api', 'cli', 'web']]
  }
}
```

#### Husky hook

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional husky
pnpm exec husky init
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

The hook checks the message file before the commit lands. Lint the same range
in CI with `npx commitlint --from origin/master --to HEAD`.

See: [Local setup](https://commitlint.js.org/guides/local-setup.html)

### Commitizen

```bash
pnpm add -D commitizen
pnpm exec commitizen init cz-conventional-changelog \
  --pnpm --save-dev --save-exact
pnpm exec cz
```

`cz` prompts for the parts and writes the message, so contributors do not need
the grammar memorised.

See: [cz-cli](https://github.com/commitizen/cz-cli)
