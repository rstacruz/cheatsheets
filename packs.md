---
title: Packs (ruby)
category: Ruby libraries
updated: 2024-07-05
intro: Packs are a specification for an extensible packaging system to help modularize Ruby applications.
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

### Make a file or directory public

```bash
$ bin/packs make_public path/to/file.rb
$ bin/packs make_public path/to/directory
```

Make file or directory public API, meaning that classes outside the package can call this logic.

#### Example

```bash
$ bin/packs make_public packs/profiles/app/services/create_profile_service.rb
```

Allow external code to call the class `CreateProfileService`.

This command will mainly move that file in `packs/profiles/app/public/create_profile_service.rb`

### Move a pack

```bash
$ bin/packs move packs/destination_pack path/to/file.rb
$ bin/packs move packs/destination_pack path/to/directory
```

Move file or directory from one pack to another pack.

```bash
$ bin/packs move_to_folder packs/foo path/to/directory
```

Move `packs/foo` to the `path/to/directory` folder, where `path/to/directory` does not contain a `package.yml` file.

```bash
$ bin/packs move_to_parent packs/child_pack packs/parent_pack
```

Set `packs/child_pack` as a child of `packs/parent_pack`.

### Add dependency to a pack

```bash
$ bin/packs add_dependency packs/from_pack packs/to_pack
```

## Packs validity

### All packs are valid?

```bash
$ bin/packs validate
```

Runs `bin/packwerk validate` under the hood (detects cycles).

### A specific pack is valid?

```bash
$ bin/packs check packs/pack_name
```

Runs `bin/packwerk check` under the hood.

### Update `package.yml`

```bash
$ bin/packs update
```

Runs `bin/packwerk update-todo` under the hood.

## Lints

```bash
$ bin/packs lint_package_todo_yml_files
```

Lint `package_todo.yml` files to check for formatting issues.

```bash
$ bin/packs lint_package_yml_files [ packs/my_pack packs/my_other_pack ]
```

Lint `package.yml` files.

```bash
$ bin/packs list_top_violations type [ packs/your_pack ]
```

List the top violations of a specific type for `packs/your_pack`.

## Also see

- [Documentation](https://github.com/rubyatscale/packs) _(`packs` github repository)_
