---
title: Capybara
subtitle: Browser test automation for Ruby
category: Ruby libraries
weight: -5
last_verified_with: "Capybara 3.40."
updated: 2020-06-13
tier: t3
---

### Navigating

```
visit articles_path
```

See: [Navigating](https://github.com/teamcapybara/capybara#navigating)

### Clicking links and buttons

```ruby
click_on 'Link Text'
click_button
click_link
```

See: [Clicking links and buttons](https://github.com/teamcapybara/capybara#clicking-links-and-buttons)

### Interacting with forms

```ruby
attach_file 'Image', '/path/to/image.jpg'
fill_in 'First Name', with: 'John'
```

#### Checkboxes

```ruby
check 'A checkbox'
uncheck 'A checkbox'
```

#### Radio buttons

```ruby
choose 'A radio button'
```

#### Selects

```ruby
select 'Option', from: 'Select box'
unselect
```

See: [Interacting with forms](https://github.com/teamcapybara/capybara#interacting-with-forms)

### Limiting

```ruby
within '.classname' do
  click '...'
end
```

#### Fieldsets

```ruby
within_fieldset :id do
  ...
end
```

See: [Session#within](https://www.rubydoc.info/gems/capybara/Capybara/Session#within-instance_method)

## Querying

### Predicates

```ruby
page.has_css?('.button')
expect(page).to have_css('.button')
page.should have_css('.button')
```

<!-- {: data-highlight="has_css?"} -->

#### Matchers

| Matcher                           | Sense                 |
| ---                               | ---                   |
| `has_content?`                    | content present       |
| `has_no_content?`                 | content absent        |
| ---                               | ---                   |
| `has_css?` _(selector)_           | CSS present           |
| `has_no_css?`                     | CSS absent            |
| ---                               | ---                   |
| `has_xpath?` _(path)_             | XPath present         |
| `has_no_xpath?`                   | XPath absent          |
| ---                               | ---                   |
| `has_link?` _(selector)_          | link present          |
| `has_no_link?`                    | link absent           |
| ---                               | ---                   |
| `has_button?` _(selector)_        | button present        |
| `has_no_button?`                  | button absent         |
| ---                               | ---                   |
| `has_field?` _(selector)_         | field present         |
| `has_no_field?`                   | field absent          |
| ---                               | ---                   |
| `has_checked_field?` _(selector)_ | checked field present |
| `has_unchecked_field?`            | field not checked     |
| ---                               | ---                   |
| `has_table?` _(selector)_         | table present         |
| `has_no_table?`                   | table absent          |
| ---                               | ---                   |
| `has_select?` _(selector)_        | select present        |
| `has_no_select?`                  | select absent         |

<!-- {: .-headers.-left-align} -->

In Rspec, these also map to matchers like `page.should have_content`.

See: [Querying](https://github.com/teamcapybara/capybara#querying)

### Selectors

```ruby
# Text
expect(page).to have_button('Save')
```

```ruby
# CSS selector
expect(page).to have_button('#submit')
```

```ruby
# XPath
expect(page).to have_button('//[@id="submit"]')
```

The `selector` arguments can be text, CSS selector, or XPath expression.

See: [XPath, CSS and selectors](https://github.com/teamcapybara/capybara#xpath-css-and-selectors)

### RSpec assertions

```ruby
# Predicate
page.has_button?('Save')
```

```ruby
# Negative matcher
expect(page).to have_no_button('Save')
```

In RSpec, you can use `page.should` assertions.

See: [RSpec matchers](https://www.rubydoc.info/gems/capybara/Capybara/RSpecMatchers#have_selector-instance_method)

### About negatives

```ruby
# have_no_*
expect(page).to have_no_button('Save')
```

```ruby
# not_to
expect(page).not_to have_button('Save')
```

The two above statements are functionally equivalent.

See: [Capybara::RSpecMatchers](https://www.rubydoc.info/gems/capybara/Capybara/RSpecMatchers)

## RSpec

### Matchers

```ruby
expect(page).to \
```

<!-- {: data-highlight="expect(page).to"} -->

#### Common matchers

```ruby
  have_current_path(expected_path)
  have_selector '.blank-state'
  have_selector 'h1#hola', text: 'Welcome'
  have_button 'Save'
  have_checked_field '#field'
  have_unchecked_field
  have_css '.class'
  have_field '#field'
  have_table '#table'
  have_xpath '//div'
```

#### Links

```ruby
  have_link 'Logout', href: logout_path
```

#### Selects

```ruby
  have_select 'Language',
    selected: 'German'
    options: ['Engish', 'German']
    with_options: ['Engish', 'German'] # partial match
```

#### Text

```ruby
  have_text 'Hello',
    type: :visible # or :all
    # alias: have_content
```

See: [RSpec matchers](https://www.rubydoc.info/gems/capybara/Capybara/RSpecMatchers#have_current_path-instance_method)

### Common options

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
<!-- {: data-highlight="text; visible; count"} -->

All matchers accept these options.

See: [Find query options](https://www.rubydoc.info/gems/capybara/Capybara/Node/Finders#find-instance_method)

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

See: [Finding](https://github.com/teamcapybara/capybara#finding)

### Scoping

```ruby
within '#delivery' do
  fill_in 'Street', with: 'Hello'
end
```

#### Other helpers

```ruby
within :xpath, '//article'
within_fieldset
within_table
within_frame
scope_to
```

#### Shortcut

```ruby
find('#x').fill_in('Street', with: 'Hello')
# same as within
```

See: [Scoping](https://github.com/teamcapybara/capybara#scoping)

### Scripting

```ruby
execute_script('$("input").trigger("change")')
evaluate_script('window.ga')
```

Executes JavaScript.

See: [Scripting](https://github.com/teamcapybara/capybara#scripting)

### Debugging

```ruby
save_and_open_page
```

Opens the webpage in your browser.

See: [Debugging](https://github.com/teamcapybara/capybara#debugging)

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

See: [Capybara::Session](https://www.rubydoc.info/gems/capybara/Capybara/Session)

### AJAX

```ruby
using_wait_time 10 do
  ...
end
```

See: [Asynchronous JavaScript](https://github.com/teamcapybara/capybara#asynchronous-javascript-ajax-and-friends)

### Page object

```ruby
page.status_code == 200
page.response_headers
```

See: <https://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Session>

### Poltergeist

```ruby
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end
Capybara.javascript_driver = :poltergeist
```

Use [poltergeist](https://github.com/teampoltergeist/poltergeist) to integrate PhantomJS.

### Blacklist

```ruby
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

See: [URL blacklisting](https://github.com/teampoltergeist/poltergeist#url-blacklisting--whitelisting)

### Debugging

```ruby
# Enable inspector: true, then debug
page.driver.debug
```
<!-- {: data-highlight="page.driver.debug"} -->

```ruby
# Pause execution for a while
page.driver.pause
```
<!-- {: data-highlight="page.driver.pause"} -->

See: [Remote debugging](https://github.com/teampoltergeist/poltergeist#remote-debugging-experimental)

## Selenium

### Accepting confirm() and alert()

```ruby
accept_alert { ... }
dismiss_confirm { ... }
accept_prompt(with: 'hi') { ... }
```

```ruby
# Via browser driver
page.driver.browser.switch_to.alert.accept
```

See: [Modals](https://github.com/teamcapybara/capybara#modals)

### Updating session

```ruby
page.set_rack_session(foo: 'bar')
```

See: [rack_session_access](https://github.com/railsware/rack_session_access#testing-with-capybara)

## See also

<!-- {: .-one-column} -->

- <https://rubydoc.info/github/jnicklas/capybara/Capybara/RSpecMatchers>
- <https://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Matchers>
