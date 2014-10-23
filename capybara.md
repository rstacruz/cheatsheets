---
title: Capybara
layout: default
---

## Navigating

    visit articles_path

## Clicking links and buttons

    click 'Link Text'
    click_button
    click_link

## Interacting with forms

    attach_file
    fill_in 'First Name', :with => 'John'
    check
    uncheck
    choose
    select
    unselect

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

    find
    find_button
    find_by_id
    find_field
    find_link
    locate

## Scoping

    within
    within_fieldset
    within_table
    within_frame
    scope_to

## Scripting

    execute_script
    evaluate_script

## Debugging

    save_and_open_page

## Miscellaneous

    all
    body
    current_url
    drag
    field_labeled
    source
    wait_until
    current_path

## Capybara RSpec matchers

    expect(page).to have_button
    expect(page).to have_checked_field
    expect(page).to have_content '...'
    expect(page).to have_css '...'
    expect(page).to have_field
    expect(page).to have_link
    expect(page).to have_select
    expect(page).to have_selector 'h1', text: 'Welcome'
    expect(page).to have_table
    expect(page).to have_text
    expect(page).to have_unchecked_field
    expect(page).to have_xpath

    expect(page).to have_selector 'h1', text: 'Welcome'

http://rubydoc.info/github/jnicklas/capybara/Capybara/RSpecMatchers
