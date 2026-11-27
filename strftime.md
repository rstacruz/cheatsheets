---
title: strftime format
seo_title: strftime cheatsheet — format codes, examples
description: "strftime format codes: date and time presets, examples and tokens for Ruby and Unix date."
category: Others
subtitle: Date format reference
logo: { set: icon-park-outline, name: calendar }
weight: -5
tier: t3
last_verified_with: "POSIX.1-2024 strftime, Ruby 3.4, GNU coreutils 9.12."
updated: 2026-11-26
intro: |
  The strftime format is the standard date formatting for UNIX. It's used in C, Ruby, and more.
links:
  - title: strftime specification
    url: https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html
---

## Using strftime

<!-- {: .-three-column} -->

### Unix date

```sh
date +%Y-%m-%d
date +'%A, %B %e, %Y'
```
<!-- {: data-highlight="+%Y-%m-%d; +'%A, %B %e, %Y'"} -->

The POSIX `date` command uses the same format codes as `strftime`.

See: [POSIX strftime](https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html)

### Ruby

```ruby
Time.now.strftime('%H:%M')
```
<!-- {: data-highlight="strftime"} -->

Ruby's `Time#strftime` accepts the same codes.

See: [Time#strftime](https://docs.ruby-lang.org/en/3.4/Time.html#method-i-strftime)

{% include common/strftime_format.md title="Format codes" %}
