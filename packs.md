---
title: Packs (ruby)
subtitle: Modular packaging for Ruby apps
category: Ruby libraries
updated: 2026-11-18
last_verified_with: "packs 0.3.0."
tier: t2
fragments:
  - "bin/packs"
  - "bin/packs create"
  - "make_public"
  - "add_dependency"
  - "move_to_folder"
  - "move_to_parent"
  - "get_info"
  - "top_violations"
  - "validate"
  - "check"
  - "update"
  - "package_todo.yml"
  - "package.yml"
  - "packs.yml"
  - "pack_paths"
  - "readme_template"
  - "app/public"
  - "gems/*"
  - "privacy"
  - "layer"
intro: Packs are a specification for an extensible packaging system to help modularize Ruby applications.
links:
  - title: Documentation
    url: https://github.com/rubyatscale/packs
keywords:
  - packs
  - packwerk
  - package.yml
  - modularization
---

## Manage packs

### Create pack

```bash
$ bin/packs create packs/pack_name
```

#### Example

```bash
$ bin/packs create packs/profiles
```

Create new pack named `profiles`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Make a file or directory public

```bash
$ bin/packs make_public path/to/file.rb
$ bin/packs make_public path/to/directory
```

#### Example

```bash
$ bin/packs make_public \
  packs/profiles/app/services/create_profile_service.rb
```

Make a file or directory public API by moving it under `app/public/`, so classes outside the pack can call `CreateProfileService`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Move files between packs

```bash
$ bin/packs move packs/destination_pack path/to/file.rb
$ bin/packs move packs/destination_pack path/to/directory
```

Move a file or directory from one pack to another, from the monolith or another pack.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Move a pack to a folder

```bash
$ bin/packs move_to_folder packs/foo path/to/directory
```

Move `packs/foo` to `path/to/directory`, which must not contain a `package.yml`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Make a child pack

```bash
$ bin/packs move_to_parent packs/child_pack packs/parent_pack
```

Set `packs/child_pack` as a child of `packs/parent_pack`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Add dependency

```bash
$ bin/packs add_dependency packs/from_pack packs/to_pack
```

Add `packs/to_pack` to `packs/from_pack/package.yml` dependencies, sorted and deduplicated.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Rename a pack

```bash
$ bin/packs rename
```

Rename a pack.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Get pack info

```bash
$ bin/packs get_info [ packs/my_pack packs/my_other_pack ]
```

Show size and violations for packs.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### CLI reference

```bash
$ bin/packs help [COMMAND]
$ bin/packs tree
```

Describe a command, or print a tree of all commands.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

## Packs validity

### Validate all packs

```bash
$ bin/packs validate
```

Runs `bin/packwerk validate` to detect cycles.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Check a pack

```bash
$ bin/packs check [ packs/pack_name ]
```

Runs `bin/packwerk check`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Update package.yml

```bash
$ bin/packs update
```

Runs `bin/packwerk update-todo`.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

## Lints

### Lint package_todo.yml

```bash
$ bin/packs lint_package_todo_yml_files
```

Check `package_todo.yml` files for formatting issues.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### Lint package.yml

```bash
$ bin/packs lint_package_yml_files \
  [ packs/my_pack packs/my_other_pack ]
```

Lint `package.yml` files.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

### List top violations

```bash
$ bin/packs list_top_violations type [ packs/your_pack ]
```

List top violations of a type (`dependency`, `privacy`, `layer`) for a pack, or all packs.

See: [CLI documentation](https://github.com/rubyatscale/packs#cli-documentation)

## Configuration

### Pack paths

#### packs.yml

```yaml
pack_paths:
  - "{packs,utilities,deprecated}/*"
  - "{packs,utilities,deprecated}/*/*"
  - "gems/*"
```

Configure where packs live.

See: [Configuration](https://github.com/rubyatscale/packs#configuration)

### README template

#### packs.yml

```yaml
readme_template_path: my_folder/README_STUFF.md
```

Customize the generated README template via `README_TEMPLATE.md`.

See: [Configuration](https://github.com/rubyatscale/packs#configuration)

## Also see

- [Documentation](https://github.com/rubyatscale/packs) _(`packs` github repository)_
- [packs-specification](https://github.com/rubyatscale/packs-specification)
- [packs-rails](https://github.com/rubyatscale/packs-rails)
- [rubocop-packs](https://github.com/rubyatscale/rubocop-packs)
- [packwerk](https://github.com/Shopify/packwerk)
- [packwerk-extensions](https://github.com/rubyatscale/packwerk-extensions)
- [code_ownership](https://github.com/rubyatscale/code_ownership)
- [pack_stats](https://github.com/rubyatscale/pack_stats)
