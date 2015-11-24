---
title: Capybara
category: Ruby libraries
---

## Navigating

    visit articles_path

## Clicking links and buttons

    click 'Link Text'
    click_button
    click_link

## Interacting with forms

    attach_file 'Image', '/path/to/image.jpg'
    fill_in 'First Name', with: 'John'

    check 'A checkbox'
    uncheck 'A checkbox'

    choose 'A radio button'

    select 'Option', from: 'Select box'
    unselect

## Limiting

    within '.classname' do
      click '...'
    end

    within_fieldset :id do ... end

## Querying

Takes a CSS selector (or XPath if you're into that).
Translates nicely into RSpec matchers:

    page.should have_no_button("Save")

Use should have_no_* versions with RSpec matchers b/c
should_not doesn't wait for a timeout from the driver

    page.has_content?
    page.has_css?
    page.has_no_content?
    page.has_no_css?
    page.has_no_xpath?
    page.has_xpath?
    page.has_link?
    page.has_no_link?
    page.has_button?("Update")
    page.has_no_button?
    page.has_field?
    page.has_no_field?
    page.has_checked_field?
    page.has_unchecked_field?
    page.has_no_table?
    page.has_table?
    page.has_select?
    page.has_no_select?

## Finding

    find_button
    find_by_id
    find_field
    find_link
    locate

## Scoping

    within '#delivery' do
      fill_in 'Street', with: 'Hello'
    end

    within :xpath, '//article'
    within_fieldset
    within_table
    within_frame
    scope_to

    find('#x').fill_in('Street', with: 'Hello')
    # same as within

## Scripting

    execute_script('$("input").trigger('change')')
    evaluate_script('window.ga')

## Debugging

    save_and_open_page

## Page

    page
      .all('h3')
      .body
      .html
      .source
      .current_host
      .current_path
      .current_url

## AJAX

    using_wait_time(10) { ... }

## Misc
   
    drag
    field_labeled
   
## Capybara RSpec matchers

```rb
# all matchers have...
  text: 'welcome'
  text: /Hello/
  visible: true
  count: 4
  between: 2..5
  minimum: 2
  maximum: 5
  wait: 10

expect(page).to have_selector '.blank-state'
expect(page).to have_selector 'h1#hola', text: 'Welcome'
expect(page).to have_button
expect(page).to have_checked_field
expect(page).to have_css '...'
expect(page).to have_field
expect(page).to have_link 'Logout',
  href: logout_path
expect(page).to have_select 'Language',
  selected: 'German'
  options: ['Engish', 'German']
  with_options: ['Engish', 'German'] # partial match
expect(page).to have_table '#table'
expect(page).to have_text 'Hello',
  type: :visible | :all
  # alias: have_content
expect(page).to have_unchecked_field
expect(page).to have_xpath
```

## Page object

```rb
page.status_code == 200
page.response_headers
```

 - <http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Session>

## Poltergeist

Use [poltergeist](https://github.com/teampoltergeist/poltergeist) to integrate PhantomJS.

```rb
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end
Capybara.javascript_driver = :poltergeist
```

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

```rb
page.driver.debug
```

Pause execution for a while:

```rb
page.driver.pause
```

## Selenium

### Accepting confirm() and alert()

```rb
accept_alert { ... }
dismiss_confirm { ... }
accept_prompt(with: 'hi') { ... }
```

Alternatively:

```rb
page.driver.browser.switch_to.alert.accept
```

### Updating session

```rb
page.set_rack_session(foo: 'bar')
```

## See also

- <http://rubydoc.info/github/jnicklas/capybara/Capybara/RSpecMatchers>
- <http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Matchers>
