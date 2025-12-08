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
  - `{: .-two-column}` - the default

## Writing guidelines

- Aim for brevity
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

```
