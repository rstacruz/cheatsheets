---
title: Rails helpers
subtitle: View helper reference
category: Rails
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-24
tier: t3
intro: |
  Rails view helpers for dates, numbers, tags, caching, translation, and date and time selects.
links:
  - title: ActionView::Helpers
    url: https://api.rubyonrails.org/classes/ActionView/Helpers.html
  - title: DateHelper
    url: https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html
  - title: NumberHelper
    url: https://api.rubyonrails.org/classes/ActionView/Helpers/NumberHelper.html
---

## Format values

### Date

```ruby
distance_of_time_in_words(Time.now, project.end_date)
#=> "about 3 hours"

distance_of_time_in_words_to_now(project.end_date)
#=> "about 3 hours"

time_ago_in_words(3.minutes.ago)
#=> "3 minutes"
```

See: [distance_of_time_in_words](https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-distance_of_time_in_words)

### Numbers

```ruby
number_to_currency 20.33                      #=> "$20.33"
number_to_currency 20.33, precision: 0        #=> "$20"
number_with_precision 3.14159, precision: 2   #=> "3.14"
number_to_percentage 32, precision: 0         #=> "32%"
number_with_delimiter 2048                    #=> "2,048"
number_to_human 12_000_000                    #=> "12 million"
number_to_human_size 12_000_000               #=> "11.4 MB"
number_to_phone "5551234"                     #=> "555-1234"
```

See: [NumberHelper](https://api.rubyonrails.org/classes/ActionView/Helpers/NumberHelper.html)

### Translation

```ruby
t("folders")
t("folders.save")
l(Time.now)
```

#### Pluralization

```ruby
t("x_files", count: files.count)
```

#### Locale file

```yaml
x_files:
  one: "one file"
  other: "%{count} files"
```

See: [t](https://api.rubyonrails.org/classes/ActionView/Helpers/TranslationHelper.html#method-i-t)

## Markup

### Tags

```ruby
tag("br")                     #=> <br />
tag.br                        #=> <br>
tag("img", src: "image.jpg")  #=> <img src="image.jpg" />
content_tag(:p, "Hello")      #=> <p>Hello</p>
```

See: [tag](https://api.rubyonrails.org/classes/ActionView/Helpers/TagHelper.html#method-i-tag)

### Cache

#### Key

```erb
<% cache [project, current_user] do %>
  <%= render project %>
<% end %>
```

#### Conditional

```erb
<% cache_if admin?, project do %>
  <%= render project %>
<% end %>
```

See: [cache](https://api.rubyonrails.org/classes/ActionView/Helpers/CacheHelper.html#method-i-cache)

### Time tag

```ruby
time_tag Date.today
#=> <time datetime="2010-11-04">November 04, 2010</time>

time_tag Date.yesterday, "Yesterday"
#=> <time datetime="2010-11-03">Yesterday</time>

time_tag Date.today, format: :short
#=> <time datetime="2010-11-04">Nov 04</time>
```

See: [time_tag](https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_tag)

## Form selects

### Time select

```ruby
time_select "article", "start_time", \
  include_seconds: true, minute_step: 15, ampm: true, \
  prompt: { hour: "Choose hr", minute: "Choose min" }
```

#### Options

| Option            | Description                |
| ----------------- | -------------------------- |
| `include_seconds` | Add a seconds select       |
| `minute_step`     | Minute interval, eg `15`   |
| `ampm`            | 12-hour clock              |
| `prompt`          | `true` or per-part prompts |
| `include_blank`   | Blank first option         |

See: [time_select](https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_select)

### Date select

```ruby
date_select "article", "written_on", \
  start_year: 1995, use_month_numbers: true, \
  order: %i[day month year], include_blank: true
```

#### Options

| Option              | Description                         |
| ------------------- | ----------------------------------- |
| `start_year`        | First year in the list              |
| `end_year`          | Last year in the list               |
| `use_month_numbers` | Show `1` instead of `Jan`           |
| `order`             | List order, eg `%i[day month year]` |
| `discard_day`       | Drop the day select                 |
| `default`           | Preselected value or hash           |

See: [date_select](https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-date_select)

### Files

```haml
= form_with model: @post do |f|
  = f.file_field :picture
```

`form_with` adds `multipart` automatically when the form has a file field.

See: [file_field](https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-file_field)

## Reference

- [ActionView::Helpers](https://api.rubyonrails.org/classes/ActionView/Helpers.html)
- [FormHelper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html)
