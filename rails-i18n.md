---
title: Rails i18n
subtitle: Translation and localization
category: Rails
intro: |
  Rails I18n provides translations, localization, and formatting helpers. This reference covers locale files, interpolation, pluralization, and number helpers.
links:
  - title: Rails I18n guide
    url: https://guides.rubyonrails.org/i18n.html
  - title: ruby-i18n/i18n repository
    url: https://github.com/ruby-i18n/i18n
  - title: ActiveSupport::NumberHelper API
    url: https://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html
tier: t3
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-26
---

### References

 * <https://guides.rubyonrails.org/i18n.html>
 * <https://github.com/ruby-i18n/i18n>
 * <https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/en.yml>

See: [Rails I18n guide](https://guides.rubyonrails.org/i18n.html)

### Example

```rb
t('my.messages.hello')

# same as 'my.messages.hello'
t(:hello, scope: 'my.messages')
t(:hello, scope: [:my, :messages])

t('my.messages.hello', default: "Hello")
```
<!-- {: data-highlight="t('my.messages.hello')"} -->

#### YAML

```yml
en:
  my:
    messages:
      hello: "Hello"
```

See: [Using translations in views and controllers](https://guides.rubyonrails.org/i18n.html#using-translations-in-views-and-controllers)

### Interpolation

```rb
t('hello', name: "John")
```
<!-- {: data-highlight="name:"} -->

#### YAML

```yml
hello: "Hello %{name}"
```

See: [Passing variables to translations](https://guides.rubyonrails.org/i18n.html#passing-variables-to-translations)

### Lazy lookup

```rb
# from the 'books/index' view
t('.title')
```
<!-- {: data-highlight="t('.title')"} -->

#### YAML

```yml
en:
  books:
    index:
      title: "Título"
```

See: [Lazy lookup](https://guides.rubyonrails.org/i18n.html#lazy-lookup)

### Plural

```rb
t(:inbox, count: 1)  #=> 'one message'
t(:inbox, count: 2)  #=> '2 messages'
```
<!-- {: data-highlight="count:"} -->


#### YAML

```yml
inbox:
  one: 'one message'
  other: '%{count} messages'
```
See: [Pluralization](https://guides.rubyonrails.org/i18n.html#pluralization)

## Localizing

### Time

```rb
l(Time.now)
l(Time.now, format: :short)
```
<!-- {: data-highlight="format: :short"} -->


#### YAML

```yml
en:
  time:
    formats:
      default: "%a, %d %b %Y %H:%M:%S %z"
      long: "%B %d, %Y %H:%M"
      short: "%d %b %H:%M"
```
See: [Adding date and time formats](https://guides.rubyonrails.org/i18n.html#adding-date-time-formats)

### Date

```rb
l(Date.today)
```
<!-- {: data-highlight="l(Date.today)"} -->


#### YAML

```yml
en:
  date:
    formats:
      default: "%Y-%m-%d" # 2015-06-25
      long: "%B %d, %Y"   # June 25, 2015
      short: "%b %d"      # Jun 25
```
See: [Adding date and time formats](https://guides.rubyonrails.org/i18n.html#adding-date-time-formats)

## ActiveRecord

### Model names

```rb
User.model_name.human            #=> "User"
Child.model_name.human(count: 2) #=> "Children"
```
<!-- {: data-highlight="model_name.human"} -->


#### YAML

```yml
en:
  activerecord:
    models:
      user: "User"
      child:
        one: "Child"
        other: "Children"
```
See: [Active Model methods](https://guides.rubyonrails.org/i18n.html#active-model-methods)

### Attributes

```rb
User.human_attribute_name :name   #=> "Name"
```
<!-- {: data-highlight="human_attribute_name"} -->

#### YAML

```yml
en:
  activerecord:
    attributes:
      user:
        # activerecord.attributes.<model>.<field>
        name: "Name"
        email: "Email"
```

See: [Active Model methods](https://guides.rubyonrails.org/i18n.html#active-model-methods)

### Error messages

```rb
# Legacy Rails 2 helper; render errors in views instead
error_messages_for(...)
```
<!-- {: data-highlight="error_messages_for"} -->

#### YAML

```yml
activerecord:
  errors:
    models:
      venue:
        attributes:
          name:
            blank: "Please enter a name."
```

See: [Error message scopes](https://guides.rubyonrails.org/i18n.html#error-message-scopes)

### Scopes

#### Key scopes

```yml
# [model], [attr] and [key] are placeholders:
activerecord.errors.models.[model].attributes.[attr].[key]
activerecord.errors.models.[model].[key]
activerecord.errors.messages.[key]
errors.attributes.[attr].[key]
errors.messages.[key]
```
<!-- {: data-highlight="[model]"} -->

#### Error keys

```yml
# Where [key] can be:
validates
  confirmation - :confirmation
  acceptance   - :accepted
  presence     - :blank
  length       - :too_short (%{count})
  length       - :too_long (%{count})
  length       - :wrong_length (%{count})
  uniqueness   - :taken
  format       - :invalid
  numericality - :not_a_number
```

See: [Error message scopes](https://guides.rubyonrails.org/i18n.html#error-message-scopes)

### Form labels

```rb
form_with model: @post do |f|
  f.label :body
end
```
<!-- {: data-highlight="f.label"} -->

#### YAML

```yml
helpers:
  # helpers.label.<model>.<field>
  label:
    post:
      body: "Your body text"
```

See: [Form helpers](https://guides.rubyonrails.org/i18n.html#form-helpers)

### Submit buttons

```rb
form_with model: @post do |f|
  f.submit
end
```
<!-- {: data-highlight="f.submit"} -->

#### YAML

```yml
helpers:
  submit:
    # helpers.submit.<action>
    create: "Create a %{model}"
    update: "Confirm changes to %{model}"

    # helpers.submit.<model>.<action>
    article:
      create: "Publish article"
      update: "Update article"
```

See: [Form helpers](https://guides.rubyonrails.org/i18n.html#form-helpers)


## Numbers

### Number helpers

```rb
number_to_delimited(2000)             #=> "2,000"
number_to_currency(12.3)              #=> "$12.30"
number_to_percentage(0.3)             #=> "30%"
number_to_rounded(3.14, precision: 0) #=> "3"
number_to_human(12_000)               #=> "12 Thousand"
number_to_human_size(12345)           #=> "12.3 kb"
```
<!-- {: data-highlight="number_to_delimited(2000)"} -->

See: [NumberHelper API](https://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html)

### Delimited

```rb
number_to_delimited(n)
```
<!-- {: data-highlight="number_to_delimited"} -->


#### YAML

```yml
number:
  format:
    separator: '.'
    delimiter: ','
    precision: 3
    significant: false
    strip_insignificant_zeroes: false
```
See: [number_to_delimited](https://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html#method-i-number_to_delimited)

### Currencies

#### Helper

```ruby
number_to_currency(n)
```

#### Locale keys

```yml
number:
  currency:
    format:
      format: "%u%n" # %u = unit, %n = number
      unit: "$"
      separator: '.'
      delimiter: ','
      precision: 3
      # (see number.format)
```
<!-- {: data-highlight="%u%n"} -->

See: [number_to_currency](https://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html#method-i-number_to_currency)

### Percentage

```rb
number_to_percentage(n)
```
<!-- {: data-highlight="number_to_percentage"} -->

#### YAML

```yml
number:
  percentage:
    format:
      format: "%n%"
      # (see number.format)
```

See: [number_to_percentage](https://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html#method-i-number_to_percentage)

## Programmatic access

### Programmatic access

```rb
I18n.backend.store_translations :en, ok: "Ok"
I18n.locale = :en
I18n.default_locale = :en

I18n.available_locales
```
<!-- {: data-highlight="store_translations"} -->

See: [Storing custom translations](https://guides.rubyonrails.org/i18n.html#storing-custom-translations)

### Translate and localize

```rb
I18n.translate :ok   # aka, I18n.t
I18n.localize date   # aka, I18n.l
```
<!-- {: data-highlight="translate; localize"} -->

See: [I18n API features](https://guides.rubyonrails.org/i18n.html#overview-of-the-i18n-api-features)
