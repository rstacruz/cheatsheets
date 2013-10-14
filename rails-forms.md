---
title: Rails form helpers
layout: default
---

### Forms

    # Model:
    = form_for @post do |f|

    = form_for @post, url: { method: 'put', action: 'create' }, html: { class: 'nifty_form'} do |f|


### Fields

    f.check_box :enabled
    f.text_field :title
    f.text_area :body, \
      :size => '60x12'

### Select dropdowns

    f.time_zone_select :time_zone
    f.date_select :birthday

    f.select :city_id, [['Lisbon',1], ['Madrid',2], ...], 4   # (4 = selected)

    f.collection_select :city_id, City.all, :id, :name

    options_for_select [['Lisbon',1], ['Madrid', 2], ...], 4  # Just makes <option> tags

### The rest

    f.submit "Create"

