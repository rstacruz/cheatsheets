---
title: Vim-rails
subtitle: Rails navigation plugin
category: Vim
html_class: key-codes
last_verified_with: "vim-rails 5.4."
updated: 2026-11-24
tier: t3
intro: |
  vim-rails commands for alternate files, abbreviations, extraction, and loading Rails files by type.
links:
  - title: vim-rails repository
    url: https://github.com/tpope/vim-rails
  - title: vim-rails documentation
    url: https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt
---

## Alternate files

### Jump to alternate

| Command | Description                       |
| ---     | ---                               |
| `:A`    | Alternate file (test)             |
| `:R`    | Related file (controller/view)    |

`:AS`, `:AV`, `:AT`, and `:AD` split, tab, and read the file instead.

See: [Alternate and related files](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L94-L136)

### What it does

| File              | `:A`              | `:R`            |
| ---               | ---               | ---             |
| **Model**         | test/models/      | db/schema.rb    |
| **Controller**    | test/controllers/ | app/views/      |
| **View**          | test/controllers/ | app/controllers |

See: [Table of alternates](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L130-L136)

## Abbreviations

### Prefixes

| Abbrev  | Expansion        |
| ---     | ---              |
| `AC::`  | ActionController |
| `AR::`  | ActiveRecord     |
| `AV::`  | ActionView       |
| `AM::`  | ActionMailer     |
| `AS::`  | ActiveSupport    |
| `AD::`  | ActionDispatch   |
| ---     | ---              |
| `logd(` | logger.debug     |
| `logi(` | logger.info      |
| `logw(` | logger.warn      |
| `loge(` | logger.error     |

Type `:Rabbrev` to list the abbreviations for the current buffer.

See: [:Rabbrev](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L586-L600)

### Model

| Abbrev   | Expansion               |
| ---      | ---                     |
| `bt(`    | belongs_to              |
| `hm(`    | has_many                |
| `ho(`    | has_one                 |
| `habtm(` | has_and_belongs_to_many |

See: [Abbreviations](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L608-L634)

### Controllers

| Abbrev  | Expansion       |
| ---     | ---             |
| `pa[`   | params          |
| `re(`   | redirect_to     |
| `rp(`   | render partial: |
| `rst(`  | respond_to      |

See: [Abbreviations](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L608-L634)

### View helpers

| Abbrev  | Expansion                 |
| ---     | ---                       |
| `dotiw` | distance_of_time_in_words |
| `taiw`  | time_ago_in_words         |

See: [Abbreviations](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L608-L634)

## Extracting

### From a view

```vim
:2,3Extract post
```

Moves lines 2–3 into `app/views/blog/_post.html.erb` and renders it.

See: [Partial extraction](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L404-L449)

### From a model

```vim
:Extract FooConcern
```

Creates `app/models/concerns/foo_concern.rb`. `:Rextract` is the old name.

See: [Partial extraction](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L404-L449)

## Loading files

### App

```vim
:Econtroller <file>   # app/controllers/*_controller.rb
:Ehelper              # app/helpers/*_helper.rb
:Emodel <file>        # app/models/*.rb
:Ejob <file>          # app/jobs/*_job.rb
:Emailer <file>       # app/mailers/*.rb
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### DB

```vim
:Emigration <file>   # db/migrate/*.rb
:Eschema             # db/schema.rb
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### Lib

```vim
:Elib <file>    # lib/*.rb
:Elib           # Gemfile
:Etask <file>   # lib/tasks/*.rake
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### Assets

```vim
:Estylesheet    # current controller's stylesheet
:Ejavascript    # current controller's JavaScript
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### Views

```vim
:Eview      # view for the current controller action
:Elayout    # layout for the current controller
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### Test

```vim
:Espec            # spec/spec_helper.rb
:Eunittest        # unit test or model spec
:Efunctionaltest  # functional test or controller spec
:Eintegrationtest # integration test or request spec
:Efixtures        # fixtures for the current model
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

### Config

```vim
:Einitializer <file>      # config/initializers/*.rb
:Elocale                  # config/locales/*.yml
:Eenvironment             # config/application.rb
:Eenvironment development # config/environments/development.rb
```

See: [File type commands](https://github.com/tpope/vim-rails/blob/v5.4/doc/rails.txt#L139-L285)

## Reference

- [vim-rails](https://github.com/tpope/vim-rails)
