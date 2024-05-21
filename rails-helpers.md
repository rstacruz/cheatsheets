---
title: Rails helpers
category: Rails
---

### Date

    distance_of_time_in_words(Time.now, project.end_date) #=> 3 hours
    distance_of_time_in_words_to_now(project.end_date)    #=> 3 hours

    time_ago_in_words 3.minutes.ago #=> "3 minutes"

### Numbers

    number_to_currency 20.33
    number_to_currency 20.33, precision: 0
    number_with_precision 3.14159, precision: 2
    number_to_percentage 32       #=> "32%"
    number_with_delimiter 2048    #=> "2,048"
    number_to_human 12000000      #=> "12 million"
    number_to_human_size 12000000 #=> "12 MB"
    number_to_phone "5551234"     #=> "555-1234"

### Cache

    <% cache project do %>
    <% cache [project, current_user] do %>

    <% cache_if admin?, project do %>
    <% cache_unless admin?, project do %>

### Tags

    tag("br")
    tag("img", src: "image.jpg")
    content_tag(:p, "Hello")

### Time select

    # Creates a time select tag that, when POSTed, will be stored in the article
    # variable in the sunrise attribute.
    time_select "article", "start_time"

    # All options are optional
    time_select "article", "start_time", \
      include_seconds: true,
      minute_step: 15,
      prompt: true,
      prompt: { hour: "Choose hr", minute: "Choose min", second: "Choose sec" },
      ampm: true

    # For dates (all options are optional)
    date_select "article", "written_on", \
      start_year: 1995,
      use_month_numbers: true,
      discard_day: true,
      include_blank: true,
      order: [:day, :month, :year],
      default: 3.days.from_now,
      default: { day: 20 },
      prompt: { day: 'Select day', month: 'Select month', year: 'Select year' }

### Time tag

    time_tag Date.today 
    #=> '<time datetime="2010-11-04">November 04, 2010<%rtime>'

    time_tag Time.now
    #=> '<time datetime="2010-11-04T17:55:45+01:00">November 04, 2010 17:55</time>'

    time_tag Date.yesterday, 'Yesterday'
    #=> '<time datetime="2010-11-03">Yesterday<%rtime>'

    time_tag Date.today, pubdate: true
    #=> '<time datetime="2010-11-04" pubdate="pubdate">November 04, 2010</time>'

    time_tag Date.today, \
      format: :short_date # (en.time.formats.short_date)

### Files

    = form_for @post, multipart: true do |f|
      = f.file_field :picture

### i18n

    t('folders')
    t('folders.save')

    l(Time.now)

    t('x_files', count: files.count)
    # files:
    #    one: 'one file'
    #    other: '%{count} files'

### References

    * http://api.rubyonrails.org/classes/ActionView/Helpers.html
