---
title: Rails i18n
layout: default
---

### Basics

    t('my.messages.hello')

    t(:hello, scope: 'my.messages')
    t(:hello, scope: [:my, :messages])

    t('my.messages.hello', default: "Hello")

### Plural

    I18n.backend.store_translations :en, inbox: {
        one: 'one message',
        other: '%{count} messages'
    }
    I18n.translate :inbox, count: 1  # => 'one message'
    I18n.translate :inbox, count: 2  # => '2 messages'

### ActiveRecord

    activerecord.attributes.user.name

    t 'blank', scope:
      activerecord.errors.models.[model_name].attributes.[attribute_name]
      activerecord.errors.models.[model_name]
      activerecord.errors.messages
      errors.attributes.[attribute_name]
      errors.messages

    helpers.submit.[model]:
      create: "Create a %{model}"
      update: "Update %{model}"

    activerecord.errors.models.venue.attributes.name.blank = "Please enter a name."

    confirmation - :confirmation
    acceptance   - :accepted
    presence     - :blank
    length       - :too_short (%{count})
    length       - :too_long (%{count})
    length       - :wrong_length (%{count})
    uniqueness   - :taken
    format       - :invalid
    numericality - :not_a_number

    activerecord.errors.template.header:
      one: "1 error prohibited this %{model} from being saved"
 
### Reference
 * http://guides.rubyonrails.org/i18n.html
