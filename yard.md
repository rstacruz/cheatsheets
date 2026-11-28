---
title: YARD
subtitle: Ruby documentation generator
logo: { src: /assets/logos/yard.svg }
category: Markup
intro: |
  Quick reference for YARD tags in Ruby documentation.
links:
  - title: YARD documentation
    url: https://yardoc.org/
tier: t3
last_verified_with: "YARD 0.9.45."
created_at: 2026-08-25
updated: 2026-11-26
---

### Method documentation

<!-- {: .-prime} -->

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

See: [Tags overview](https://github.com/lsegal/yard/blob/main/docs/Tags.md)

## Parameters and return values

### Parameters

```ruby
# @param name [String] the user name
# @param count [Integer] the number of retries
# @param enabled [Boolean] whether retries are enabled
```

For keyword parameters, use `@param`.

See: [Adding tags](https://github.com/lsegal/yard/blob/main/docs/GettingStarted.md#adding-tags-to-documentation)

### Return values

```ruby
# @return [String] the matching name
# @return [nil] if no match exists
```

Use multiple `@return` tags for distinct return cases.

See: [Common tag syntaxes](https://github.com/lsegal/yard/blob/main/docs/Tags.md#common-tag-syntaxes)

### Exceptions

```ruby
# @raise [AccountBalanceError] if funds are insufficient
```

See: [Common tag syntaxes](https://github.com/lsegal/yard/blob/main/docs/Tags.md#common-tag-syntaxes)

### Options hash

```ruby
# @param opts [Hash] message options
# @option opts [String] :subject the subject
# @option opts [String] :from ("nobody") the sender
# @option opts [String] :to the recipient
# @option opts [String] :body ("") the message body
```

Use `@option` for keys inside an options hash, not for keyword parameters.

See: [Hash types](https://github.com/lsegal/yard/blob/main/docs/Tags.md#hashes)

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

See: [Type list conventions](https://github.com/lsegal/yard/blob/main/docs/Tags.md#type-list-conventions)

### Reference tags

```ruby
# @param user [String] the user name
# @param host [String] the host name
def clean(user, host)
end
```

```ruby
# @param (see #clean)
def activate(user, host)
end
```

`(see OBJECT)` copies matching tag data from another documented object.

See: [Reference tags](https://github.com/lsegal/yard/blob/main/docs/Tags.md#reference-tags)

## Examples and links

### Example

```ruby
# @example Reverse a string
#   "hello".reverse #=> "olleh"
```

The optional text after `@example` becomes the example title.

See: [Adding tags](https://github.com/lsegal/yard/blob/main/docs/GettingStarted.md#adding-tags-to-documentation)

### Object references

```text
{User}
{User#name}
{User#name Display name}
```

See: [Linking objects](https://github.com/lsegal/yard/blob/main/docs/GettingStarted.md#customized-yard-markup)

### Common tags

| Tag | Use |
| --- | --- |
| `@api` | API audience |
| `@author` | Author name |
| `@deprecated` | Replacement guidance |
| --- | --- |
| `@example` | Usage example |
| `@note` | Important note |
| `@option` | Options hash key |
| `@param` | Method parameter |
| --- | --- |
| `@private` | Private API |
| `@raise` | Raised exception |
| `@return` | Return value |
| `@see` | Related object or URL |
| `@since` | First release |
| `@todo` | Pending work |
| --- | --- |
| `@yieldparam` | Block parameter |
| `@yieldreturn` | Block return value |

See: [List of tags](https://github.com/lsegal/yard/blob/main/docs/GettingStarted.md#list-of-tags)

## Also see

- [Getting started](https://github.com/lsegal/yard/blob/main/docs/GettingStarted.md)
- [Tags overview](https://github.com/lsegal/yard/blob/main/docs/Tags.md)
- [Types parser](https://yardoc.org/types.html)

<!-- {: .-also-see} -->
