---
title: StimulusReflex
category: Ruby
layout: 2017/sheet
updated: 2021-01-07
---

### via Data Attributes

Trigger reflexes without writing any javascript with the `data-reflex` attribute.

```erb
<!-- index.html.erb -->
<a
  href="#"
  data-reflex="click->CounterReflex#increment"
  data-step="1"
  data-count="<%= @count.to_i %>"
  >Increment <%= @count.to_i %></a
>
```

```ruby
# counter_reflex.rb
class CounterReflex < StimulusReflex::Reflex
  def increment
    @count = element.dataset[:count].to_i + element.dataset[:step].to_i
  end
end
```

### from Stimulus.js Controller

Stimulus.js controllers registered with StimulusReflex can use the `stimulate` method to trigger reflexes

```erb
<!-- index.html.erb -->
<a href="#"
  data-controller="counter"
  data-action="click->counter#increment"
>Increment <%= @count %></a>
```

```javascript
// counter_controller.js
import { Controller } from 'stimulus'
import StimulusReflex from 'stimulus_reflex'

export default class extends Controller {
  connect() {
    StimulusReflex.register(this)
  }

  increment(event) {
    event.preventDefault()
    this.stimulate('Counter#increment', 1)
  }
}
```

```ruby
# counter_reflex.rb
class CounterReflex < StimulusReflex::Reflex
  def increment(step = 1)
    session[:count] = session[:count].to_i + step
   end
end
```

## Morphs

### Selector morphs

Instead of refreshing the entire page, you can specify a portion of the page to update with `morph(selector, content)`

```erb
<!-- show.html.erb -->
<header data-reflex="click->Example#change">
  <%= render partial: "path/to/foo", locals: {message: "Am I the medium or the massage?"} %>
</header>
```

```erb
<!-- _foo.html.erb -->
<div id="foo">
  <span class="spa"><%= message %></span>
</div>
```

```ruby
# example_reflex.rb
class ExampleReflex < ApplicationReflex
  def change
    morph "#foo", "Your muscles... they are so tight."
  end
end
```

### Nothing morph

Use `morph :nothing` in reflexes that do something on the server without updating the client.

```ruby
# example_reflex.rb
class ExampleReflex < ApplicationReflex
  def change
    LongRunningJob.perform_later
    morph :nothing
  end
end
```

## Lifecycle

### Server-side callbacks

Reflex classes can use the following callbacks. [Full Docs](http://docs.stimulusreflex.com/lifecycle#server-side-reflex-callbacks)

- `before_reflex`
- `around_reflex`
- `after_reflex`

### Client-side callbacks (generic)

StimulusReflex controllers automatically support five generic lifecycle callback methods.

- `beforeReflex(element, reflex, noop, reflexId)` prior to sending a request over the web socket
- `reflexSuccess(element, reflex, noop, reflexId)` after the server side Reflex succeeds and the DOM has been updated
- `reflexError(element, reflex, error, reflexId)` whenever the server side Reflex raises an error
- `reflexHalted(element, reflex, noop, reflexId)` reflex canceled with throw :abort in the before_reflex callback
- `afterReflex(element, reflex, noop, reflexId)` after both success and error
- `finalizeReflex(element, reflex, noop, reflexId)` after both success and error

### Client-side callbacks (custom)

StimulusReflex controllers can define up to five custom lifecycle callback methods for each Reflex action. These methods use a naming convention based on the name of the Reflex. e.g. for the `add_one` reflex:

- `beforeAddOne(element, reflex, noop, reflexId)`
- `addOneSuccess(element, reflex, noop, reflexId)`
- `addOneError(element, reflex, error, reflexId)`
- `addOneHalted(element, reflex, noop, reflexId)`
- `afterAddOne(element, reflex, noop, reflexId)`
- `finalizeAddOne(element, reflex, noop, reflexId)`

### Client-side events

If you need to know when a Reflex method is called, but you're working outside of the Stimulus controller that initiated it, you can subscribe to receive DOM events

- `stimulus-reflex:before`
- `stimulus-reflex:success`
- `stimulus-reflex:error`
- `stimulus-reflex:halted`
- `stimulus-reflex:after`

There are also events related to the StimulusReflex library setting up and connecting to ActionCable

- `stimulus-reflex:connected`
- `stimulus-reflex:disconnected`
- `stimulus-reflex:rejected`
- `stimulus-reflex:ready`

## Helpful tips

### Forms

If a Reflex is called on a form element - or a child of that form element - then the data for the whole form will be properly serialized and made available to the Reflex action method as the `params` accessor. [Read more](http://docs.stimulusreflex.com/working-with-forms)

### Promises

`stimulate()` method returns a promise

```javascript
this.stimulate('Comments#create')
  .then(() => this.doSomething())
  .catch(() => this.handleError())
```

### Inheriting data-attributes from parent elements

You can use the `data-reflex-dataset="combined"` directive to scoop all data attributes up the DOM hierarchy and pass them as part of the Reflex payload.

```erb
<!-- new.html.erb -->
<div data-post-id="<%= @post.id %>">
  <div data-category-id="<%= @category.id %>">
    <button data-reflex="click->Comment#create" data-reflex-dataset="combined">Create</button>
  </div>
</div>
```

```ruby
# comment_reflex.rb
class CommentReflex < ApplicationReflex
  def create
    puts element.dataset["post-id"]
    puts element.dataset["category-id"]
  end
end
```

### Reflex root

Instead of updating your entire page, you can specify exactly which parts of the DOM will be updated using the `data-reflex-root` attribute. [Full docs](http://docs.stimulusreflex.com/morph-modes#scoping-page-morphs)

```text
<!-- index.html.erb -->
<div data-reflex-root="[forward],[backward]">
  <input type="text" value="<%= @words %>" data-reflex="keyup->Example#words">
  <div forward><%= @words %></div>
  <div backward><%= @words&.reverse %></div>
</div>
```

```ruby
# example_reflex.rb
  def words
    @words = element[:value]
  end
```

### Permanent elements

Add data-reflex-permanent to any element in your DOM, and it will be left unchanged by full-page Reflex updates and morph calls that re-render partials.

```erb
<!-- index.html.erb -->
<div data-reflex-permanent>
  <iframe src="https://ghbtns.com/github-btn.html?user=hopsoft&repo=stimulus_reflex&type=star&count=true" frameborder="0" scrolling="0" class="ghbtn"></iframe>
  <iframe src="https://ghbtns.com/github-btn.html?user=hopsoft&repo=stimulus_reflex&type=fork&count=true" frameborder="0" scrolling="0" class="ghbtn"></iframe>
</div>
```

### Aborting a reflex

call `raise :abort` within a reflex method to cancel it.

```ruby
# comment_reflex.rb
class CommentReflex < ApplicationReflex
  def create
    raise :abort
  end
end
```
