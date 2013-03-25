title: Rails helpers
---

### Date helpers

http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html

### Date

    distance_of_time_in_words(Time.now, project.end_date) #=> 3 hours
    distance_of_time_in_words_to_now project.end_date     #=> 3 hours

### Time select

    # Creates a time select tag that, when POSTed, will be stored in the article
    # variable in the sunrise attribute.
    time_select "article", "start_time"

    # All options are optional
    time_select "article", "start_time", \
      :include_seconds => true,
      :minute_step => 15,
      :prompt => true,
      :prompt => { :hour => "Choose hr", :minute => "Choose min", :second => "Choose sec" },
      :ampm => true

    # For dates (all options are optional)
    date_select "article", "written_on", \
      :start_year => 1995,
      :use_month_numbers => true,
      :discard_day => true,
      :include_blank => true,
      :order => [:day, :month, :year],
      :default => 3.days.from_now,
      :default => { :day => 20 },
      :prompt => { :day => 'Select day', :month => 'Select month', :year => 'Select year' }

### Time tag

    time_tag Date.today  #=> <time datetime="2010-11-04">November 04, 2010<%rtime>
    time_tag Time.now    #=> <time datetime="2010-11-04T17:55:45+01:00">November 04, 2010 17:55</time>

    time_tag Date.yesterday, 'Yesterday'   #=> <time datetime="2010-11-03">Yesterday<%rtime>
    time_tag Date.today, :pubdate => true  #=> <time datetime="2010-11-04" pubdate="pubdate">November 04, 2010</time>

    time_tag Date.today, \
      :format => :short_date # (en.time.formats.short_date)


### Files

    = form_for @post, :multipart => true do |f|
      = f.file_field :picture
