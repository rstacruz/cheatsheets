# Cheatsheet guidelines

## Content organisation

- **Progressive complexity:** Start with basics, move to advanced
- **Logical sections:** Group related functionality together
- **H2 and H3:** Organise documents into H2 and H3 sections

H2 content length:

- Short H2s: 2-4 H3s (e.g., "Installing", "Getting started")
- Medium H2s: 4-7 H3s (e.g., "Components", "Lifecycle")  
- Long H2s: 7+ H3s (use column layouts)

H3 content length:

- Focused: One main concept + examples
- Consistent: Similar depth within each H2
- Self-contained: Each H3 should be understandable independently

## Format

- Documentation is in the format of Markdown with Kramdown class extensions
- H3's can have the following class names:
  - `{: .-prime}` - Visually highlighted section. Only use once per document at most.
- PRE elements can have:
  - `{: .-setup}` - Visually muted section. Used for sections with less importance. Deprecated, use sparingly.
- H2's can have:
  - `{: .-three-column}` - use if the H3's are short, and if there are at least 3 H3's in the H2.
  - `{: .-two-column}` - the default (don't add this since it's the default)

## Code blocks

- Maximum line width is 70 characters
- In `.-three-column` sections, maximum is 42 characters
- Wrap onto more lines rather than exceed the limit
- Blocks of 5+ lines should add `{: data-line="…"}` after the closing fence to highlight the relevant line(s); skip when nothing is worth highlighting

## Writing guidelines

- Aim for brevity
- Paragraphs that follow a code block: 25 words max
- Table descriptions: keep them short — 8 words max. Prefer parentheticals over separate sentences
- Sentence case headings, never Title Case
- Omit explanations if they are obvious

## Content priorities

1. **Essential first**: Most commonly used 20% of functionality
2. **Progressive disclosure**: Basic → intermediate → advanced
3. **Practical examples**: Real-world use cases over theoretical
4. **Quick reference**: Dense information for experienced developers
5. **Learning path**: Logical progression for newcomers

## H3 writing guidelines

- Place documentation links in the end. (see next for example)
- Prefer to write explanations *after* a pre/table. Example:

  ````markdown
  ### Setting default props
  
  ```jsx
  Hello.defaultProps = {
    color: 'blue'
  }
  ```
  
  Default properties are used if no properties are given.
  
  See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)
  ````

- When an example has multiple files, use H4 as filename markers. Example:

  ````markdown
  ### via Data Attributes
  
  #### index.html.erb
  
  ```html
  <a
    href="#"
    data-reflex="click->CounterReflex#increment"
    data-step="1"
    data-count="<%= @count.to_i %>"
    >Increment <%= @count.to_i %></a
  >
  ```
  
  #### counter_reflex.rb
  
  ```ruby
  class CounterReflex < StimulusReflex::Reflex
    def increment
      @count = element.dataset[:count].to_i + element.dataset[:step].to_i
    end
  end
  ```
  
  Trigger reflexes without writing any javascript with the `data-reflex` attribute.
  
  ````

- When showing reference information, use tables for quick scanning. Example:

  ````markdown
  ### Primitives

  | Sample                  | Type            |
  | ---                     | ---             |
  | `nil`                   | Nil/null        |
  | `true` _/_ `false`      | Boolean         |
  | ---                     | ---             |
  | `23`                    | Integer         |
  | `3.14`                  | Float           |
  | ---                     | ---             |
  | `"hello"`               | Binary string   |
  | `:hello`                | Atom            |

  These are the basic data types in Elixir.
  ````

- Use inline comments to explain results, equivalents, or provide context. Example:

  ````markdown
  ### Pattern matching

  ```elixir
  user = %{name: "Tom", age: 23}
  %{name: username} = user  # → username = "Tom"
  ```

  ### Piping

  ```elixir
  source
  |> transform(:hello)     # Step 1: transform the data
  |> print()               # Step 2: output the result
  ```

  ```elixir
  # Same as:
  print(transform(source, :hello))
  ```

  ### Type conversions

  ```elixir
  Integer.parse("34")      # → {34, ""}
  Float.parse("34.1")      # → {34.1, ""}
  ```
  ````

## H4 sub-headings

Use H4s to split an H3 into labelled segments: concept variants ("As UTC time"), topics ("Sessions"), or reference groups ("All options"). For filenames, see H3 writing guidelines.

Example:

````markdown
### Parsing

#### As local time

```js
const date = new Date(2012, 11, 20, 3, 0, 0)
```

#### As UTC time

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
```
````

- Keep labels short (1-4 words)
- Prefer 2-4 segments per H3; more suggests H3s
- Variant segments get one code block; topic and reference segments may hold several blocks or a table
- Single-line variants of the same construct stay in one block with inline comments
- If segments share context (sample data, locale), add one lead-in sentence after the H3
- A segment gets its own `See:` only when it has a different doc page
- H4s are scan aids, not sections: layout and navigation only account for H2s and H3s

## Deprecated sheets

- Outdated versions go to `<name>@<version series>.md` files (eg `phoenix@1.2.md`).
- Set `deprecated: true` to show a deprecation notice and hide the sheet from related and top lists.
- Set `deprecated_by: /<newer sheet>` to link the notice to the newer sheet; this alone also marks the sheet deprecated.

## Syntax highlighting

Ensure syntax highlighting languages are part of [PrismJS's supported languages](https://github.com/PrismJS/prism/tree/v1.29.0/components).

## Introduction

- Introduction H3s are strongly recommended in the first H2.
- Max 25 words per paragraph.
- Max 3 links. These should always be reputable, first-party sources as much as possible.

````
### Introduction
{: .-intro}

[Claude Code](https://code.claude.com/docs) is Anthropic's AI coding assistant for the terminal. This reference covers the most commonly used commands, flags, and settings.

- [Claude Code documentation](https://code.claude.com/docs) _(code.claude.com)_
- [GitHub repository](https://github.com/anthropics/claude-code) _(github.com)_
````

## Tables: separating

Separating tables is preferred when a table grows to 8 or more rows.

### Option A: H4s and multiple tables

````markdown
### Examples

#### Date

| Example                   | Output                 |
| ------------------------- | ---------------------- |
| `YYYY-MM-DD`              | 2014-01-01             |
| `dddd, MMMM Do YYYY`      | Friday, May 16th 2014  |
| `dddd [the] Do [of] MMMM` | Friday the 16th of May |

#### Time

| Example   | Output   |
| --------- | -------- |
| `hh:mm a` | 12:30 pm |

Used by [Moment.js](http://momentjs.com/docs/#/displaying/) and [date-fns/format](https://date-fns.org/v1.28.5/docs/format). Similar to Java [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).
````

### Option B: horizontal lines

````markdown
| Example | Output                           |
| ------- | -------------------------------- |
| `LT`    | 8:30 PM                          |
| `LTS`   | 8:30:25 PM                       |
| ---     | ---                              |
| `LL`    | August 2 1985                    |
| `ll`    | Aug 2 1985                       |
| ---     | ---                              |
| `LLL`   | August 2 1985 08:30 PM           |
| `lll`   | Aug 2 1985 08:30 PM              |
| ---     | ---                              |
| `LLLL`  | Thursday, August 2 1985 08:30 PM |
| `llll`  | Thu, Aug 2 1985 08:30 PM         |
````

## SEO descriptions

- Write `keywords` + `intro` for SEO purposes (preferred).
- `description` + `intro` is also supported.

### Option A: Keywords (and intro)

Set `keywords` (and optionally `intro`). This is the easiest and the preferred
way for now.

```
React cheatsheet - devhints.io
------------------------------
https://devhints.io/react ▼
React.Component · render() · componentDidMount() · props/state · React is a
JavaScript library for building web...
```

### Option B: Description (and intro)

Set `description` (and optionally `intro`)

```
React cheatsheet - devhints.io
------------------------------
https://devhints.io/react ▼
One-page reference to React and its API. React is a JavaScript library for
building web user interfaces...
```

### Option C: Intro only

If you left out `description` or `keywords`, a default description will be added.
