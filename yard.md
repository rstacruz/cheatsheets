---
title: YARD
category: Markup
intro: |
  Quick reference for YARD tags in Ruby documentation.
---

### Method documentation
{: .-prime}

```ruby
# Downloads a page.
#
# @param url [String] the page URL
# @param directory [String] the output directory
# @return [String] the saved file path
# @raise [DownloadError] if the request fails
# @example Download into the default directory
#   download("https://example.com/")
def download(url, directory: "pages")
end
```

YARD tags begin with `@` at the start of a comment line.

## Parameters and return values

### Parameters

```ruby
# @param name [String] the user name
# @param count [Integer] the number of retries
# @param enabled [Boolean] whether retries are enabled
```

For keyword parameters, use `@param`.

### Return values

```ruby
# @return [String] the matching name
# @return [nil] if no match exists
```

Use multiple `@return` tags for distinct return cases.

### Exceptions

```ruby
# @raise [AccountBalanceError] if funds are insufficient
```

### Options hash

```ruby
# @param opts [Hash] message options
# @option opts [String] :subject the subject
# @option opts [String] :from ("nobody") the sender
# @option opts [String] :to the recipient
# @option opts [String] :body ("") the message body
```

Use `@option` for keys inside an options hash, not for keyword parameters.

## Types

### Common forms

| Form | Meaning |
| --- | --- |
| `[String]` | One type |
| `[String, nil]` | Alternative types |
| `[Array<String>]` | Collection members |
| `[Hash{Symbol => String}]` | Key and value types |
| `[#read]` | Duck type |
| `[Boolean]` | `true` or `false` |
| `[void]` | Return value unused |

YARD type declarations are conventions rather than Ruby runtime checks.

### Reference tags

```ruby
# @param user [String] the user name
# @param host [String] the host name
def clean(user, host)
end

# @param (see #clean)
def activate(user, host)
end
```

`(see OBJECT)` copies matching tag data from another documented object.

## Examples and links

### Example

```ruby
# @example Reverse a string
#   "hello".reverse #=> "olleh"
```

The optional text after `@example` becomes the example title.

### Object references

```text
{User}
{User#name}
{User#name Display name}
```

### Common tags

| Tag | Use |
| --- | --- |
| `@api` | API audience |
| `@author` | Author name |
| `@deprecated` | Replacement guidance |
| `@example` | Usage example |
| `@note` | Important note |
| `@option` | Options hash key |
| `@param` | Method parameter |
| `@private` | Private API |
| `@raise` | Raised exception |
| `@return` | Return value |
| `@see` | Related object or URL |
| `@since` | First release |
| `@todo` | Pending work |
| `@yieldparam` | Block parameter |
| `@yieldreturn` | Block return value |

## Also see
{: .-one-column}

- <https://www.rubydoc.info/gems/yard/file/docs/GettingStarted.md>
- <https://www.rubydoc.info/gems/yard/file/docs/Tags.md>
- <https://yardoc.org/types.html>
{: .-also-see}
