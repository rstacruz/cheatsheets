---
title: Capybara
category: Ruby libraries
layout: 2017/sheet
weight: -5
updated: 2017-08-30
---

### Navigating

    visit articles_path

### Clicking links and buttons

    click 'Link Text'
    click_button
    click_link

### Interacting with forms

```ruby
attach_file 'Image', '/path/to/image.jpg'
fill_in 'First Name', with: 'John'
```

```ruby
check 'A checkbox'
uncheck 'A checkbox'
```

```ruby
choose 'A radio button'
```

```ruby
select 'Option', from: 'Select box'
unselect
```

### Limiting

```ruby
within '.classname' do
  click '...'
end
```

```ruby
within_fieldset :id do
  ...
end
```

## Querying

### Predicates

| Positive                              | Negative                                |
| ---                                   | ---                                     |
| `page.has_content?`                   | `page.has_no_content?`                  |  |
| ---                                   | ---                                     |
| `page.has_css?` _(selector)_          | `page.has_no_css?`_(selector)_          |  |
| ---                                   | ---                                     |
| `page.has_xpath?`_(path)_             | `page.has_no_xpath?`_(path)_            |  |
| ---                                   | ---                                     |
| `page.has_link?`_(selector)_          | `page.has_no_link?`_(selector)_         |  |
| ---                                   | ---                                     |
| `page.has_button?`_(selector)_        | `page.has_no_button?`_(selector)_       |  |
| ---                                   | ---                                     |
| `page.has_field?`_(selector)_         | `page.has_no_field?`_(selector)_        |  |
| ---                                   | ---                                     |
| `page.has_checked_field?`_(selector)_ | `page.has_unchecked_field?`_(selector)_ |  |
| ---                                   | ---                                     |
| `page.has_table?`_(selector)_         | `page.has_no_table?`_(selector)_        |  |
| ---                                   | ---                                     |
| `page.has_select?`_(selector)_        | `page.has_no_select?`_(selector)_       |  |
{: .-headers}

In Rspec, these also map to matchers like `page.should have_content`.

### Selectors

```ruby
expect(page).to have_button('Save')
```

```ruby
expect(page).to have_button('#submit')
```

```ruby
expect(page).to have_button('//[@id="submit"]')
```

The `selector` arguments can be text, CSS selector, or XPath expression.

### RSpec Assertions

```ruby
page.has_button?('Save')
```

```ruby
expect(page).to have_no_button('Save')
```

In RSpec, you can use `page.should` assertions.

### About negatives

```ruby
expect(page).to have_no_button('Save')   # OK
```
```ruby
expect(page).not_to have_button('Save')  # Bad
```

Use `should have_no_*` versions with RSpec matchers because
`should_not have_*` doesn't wait for a timeout from the driver.

## RSpec

### Matchers

```ruby
expect(page).to \
```
{: .-setup}

```ruby
  have_selector '.blank-state'
  have_selector 'h1#hola', text: 'Welcome'
  have_button
  have_checked_field
  have_css '...'
  have_field
  have_table '#table'
  have_unchecked_field
  have_xpath
```

```ruby
  have_link 'Logout', href: logout_path
```

```ruby
  have_select 'Language',
    selected: 'German'
    options: ['Engish', 'German']
    with_options: ['Engish', 'German'] # partial match
```

```ruby
  have_text 'Hello',
    type: :visible # or :all
    # alias: have_content
```

### Common options

All matchers have these options:
{: .-setup}

```ruby
  text: 'welcome'
  text: /Hello/
  visible: true
  count: 4
  between: 2..5
  minimum: 2
  maximum: 5
  wait: 10
```

## Other features

### Finding

```ruby
find(selector)
find_button(selector)
find_by_id(id)
find_field(selector)
find_link(selector)
locate
```

### Scoping

```ruby
within '#delivery' do
  fill_in 'Street', with: 'Hello'
end
```

```ruby
within :xpath, '//article'
within_fieldset
within_table
within_frame
scope_to
```

```ruby
find('#x').fill_in('Street', with: 'Hello')
# same as within
```

### Scripting

```ruby
execute_script('$("input").trigger('change')')
evaluate_script('window.ga')
```

Executes JavaScript.

### Debugging

```ruby
save_and_open_page
```

Opens the webpage in your browser.

### Page

```ruby
page
  .all('h3')
  .body
  .html
  .source
  .current_host
  .current_path
  .current_url
```

### AJAX

```ruby
using_wait_time 10 do
  ...
end
```

### Misc

    drag
    field_labeled

### Page object

```rb
page.status_code == 200
page.response_headers
```

See: <http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Session>

### Poltergeist

```rb
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end
Capybara.javascript_driver = :poltergeist
```

Use [poltergeist](https://github.com/teampoltergeist/poltergeist) to integrate PhantomJS.

### Blacklist

```rb
config.before :each, :js do
  page.driver.browser.url_blacklist = [
    'fonts.googleapis.com',
    'use.typekit.net',
    'f.vimeocdn.com',
    'player.vimeo.com',
    'www.googletagmanager.com'
  ].flat_map { |domain| [ "http://#{domain}", "https://#{domain}" ] }
end
```

### Debugging

Enable `inspector: true` and then:
{: .-setup}

```rb
page.driver.debug
```

To pause execution for a while:

```rb
page.driver.pause
```

## Selenium

### Accepting confirm() and alert()

```ruby
accept_alert { ... }
dismiss_confirm { ... }
accept_prompt(with: 'hi') { ... }
```

Alternatively:

```ruby
page.driver.browser.switch_to.alert.accept
```

### Updating session

```ruby
page.set_rack_session(foo: 'bar')
```

## See also
{: .-one-column}

- <http://rubydoc.info/github/jnicklas/capybara/Capybara/RSpecMatchers>
- <http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Matchers>
