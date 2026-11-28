---
title: StimulusReflex
subtitle: Rails reactive page updates
logo: { src: /assets/logos/stimulus-reflex.svg }
category: Ruby
intro: |
  StimulusReflex updates Rails pages reactively over WebSockets using server-side reflexes and morphs.
links:
  - title: Reflexes guide
    url: https://v3-4-docs.docs.stimulusreflex.com/guide/reflexes
  - title: Morph modes
    url: https://v3-4-docs.docs.stimulusreflex.com/guide/morph-modes
  - title: Lifecycle
    url: https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle
tier: t3
last_verified_with: "StimulusReflex 3.5.5."
created_at: 2021-01-07
updated: 2026-11-26
---

## Getting started

### via Data Attributes

#### index.html.erb

```html
<a
  href="#"
  data-reflex="click->CounterReflex#increment"
  data-step="1"
  data-count="<%= @count.to_i %>"
  >Increment <%= @count.to_i %></a
>
```

#### counter_reflex.rb

```ruby
class CounterReflex < StimulusReflex::Reflex
  def increment
    @count = element.dataset[:count].to_i +
      element.dataset[:step].to_i
  end
end
```

Trigger reflexes without writing any JavaScript with `data-reflex`.

See: [Declaring reflexes](https://v3-4-docs.docs.stimulusreflex.com/guide/reflexes#declaring-a-reflex-in-html-with-data-attributes)

### from Stimulus.js Controller

#### index.html.erb

```html
<a href="#"
  data-controller="counter"
  data-action="click->counter#increment"
>Increment <%= @count %></a>
```

#### counter_controller.js

```javascript
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

#### counter_reflex.rb

```ruby
class CounterReflex < StimulusReflex::Reflex
  def increment(step = 1)
    session[:count] = session[:count].to_i + step
  end
end
```

Stimulus controllers registered with StimulusReflex can call `stimulate` to trigger reflexes.

See: [Calling reflexes](https://v3-4-docs.docs.stimulusreflex.com/guide/reflexes#calling-a-reflex-in-a-stimulus-controller)

## Morphs

### Selector morphs

#### show.html.erb

```html
<header data-reflex="click->Example#change">
  <%= render partial: "path/to/foo",
    locals: { message: "Am I the medium or the massage?" } %>
</header>
```

#### _foo.html.erb

```html
<div id="foo">
  <span class="spa"><%= message %></span>
</div>
```

#### example_reflex.rb

```ruby
class ExampleReflex < ApplicationReflex
  def change
    morph "#foo", "Your muscles... they are so tight."
  end
end
```

Instead of refreshing the entire page, use `morph(selector, content)` to update one portion.

See: [Selector morphs](https://v3-4-docs.docs.stimulusreflex.com/guide/morph-modes#selector-morphs)

### Nothing morph

#### example_reflex.rb

```ruby
class ExampleReflex < ApplicationReflex
  def change
    LongRunningJob.perform_later
    morph :nothing
  end
end
```

Use `morph :nothing` when a Reflex does server-side work without updating the client.

See: [Nothing morphs](https://v3-4-docs.docs.stimulusreflex.com/guide/morph-modes#nothing-morphs)

## Lifecycle

### Server-side callbacks

Reflex classes can use the following callbacks.

- `before_reflex`
- `around_reflex`
- `after_reflex`

<!-- {: .-enum-lines} -->

See: [Server-side callbacks](https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle#server-side-reflex-callbacks)

### Client-side callbacks (generic)

StimulusReflex controllers automatically support five generic lifecycle callback methods.

- `beforeReflex(element, reflex, noop, reflexId)` prior to sending a request over the web socket
- `reflexSuccess(element, reflex, noop, reflexId)` after the server side Reflex succeeds and the DOM has been updated
- `reflexError(element, reflex, error, reflexId)` whenever the server side Reflex raises an error
- `reflexHalted(element, reflex, noop, reflexId)` reflex canceled with raise :abort in the before_reflex callback
- `afterReflex(element, reflex, noop, reflexId)` after both success and error
- `finalizeReflex(element, reflex, noop, reflexId)` after both success and error

See: [Generic life-cycle methods](https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle#generic-life-cycle-methods)

### Client-side callbacks (custom)

StimulusReflex controllers can define up to five custom lifecycle callback methods for each Reflex action. These methods use a naming convention based on the name of the Reflex. e.g. for the `add_one` reflex:

- `beforeAddOne(element, reflex, noop, reflexId)`
- `addOneSuccess(element, reflex, noop, reflexId)`
- `addOneError(element, reflex, error, reflexId)`
- `addOneHalted(element, reflex, noop, reflexId)`
- `afterAddOne(element, reflex, noop, reflexId)`
- `finalizeAddOne(element, reflex, noop, reflexId)`

See: [Custom life-cycle methods](https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle#custom-life-cycle-methods)

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

See: [Life-cycle events](https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle#life-cycle-events)

## Helpful tips

### Forms

A Reflex on a form (or its child) serializes the whole form into `params`.

See: [Working with forms](https://v3-4-docs.docs.stimulusreflex.com/guide/working-with-forms)

### Promises

```javascript
this.stimulate('Comments#create')
  .then(() => this.doSomething())
  .catch(() => this.handleError())
```

The `stimulate()` method returns a promise, so callbacks can chain from it.

See: [Promises](https://v3-4-docs.docs.stimulusreflex.com/guide/lifecycle#promises)

### Inheriting data-attributes from parent elements

#### new.html.erb

```html
<div data-post-id="<%= @post.id %>">
  <div data-category-id="<%= @category.id %>">
    <button
      data-reflex="click->Comment#create"
      data-reflex-dataset="combined"
      >Create</button
    >
  </div>
</div>
```

#### comment_reflex.rb

```ruby
class CommentReflex < ApplicationReflex
  def create
    puts element.dataset["post-id"]
    puts element.dataset["category-id"]
  end
end
```

Use `data-reflex-dataset="combined"` to pass attributes from parent elements in the Reflex payload.

See: [Inheriting data attributes](https://v3-4-docs.docs.stimulusreflex.com/guide/reflexes#inheriting-data-attributes-from-parent-elements)

### Reflex root

#### index.html.erb

```text
<div data-reflex-root="[forward],[backward]">
  <input type="text" value="<%= @words %>"
    data-reflex="keyup->Example#words">
  <div forward><%= @words %></div>
  <div backward><%= @words&.reverse %></div>
</div>
```

#### example_reflex.rb

```ruby
class ExampleReflex < ApplicationReflex
  def words
    @words = element[:value]
  end
end
```

Use `data-reflex-root` to limit which parts of the DOM a Reflex updates.

See: [Scoping page morphs](https://v3-4-docs.docs.stimulusreflex.com/guide/morph-modes#scoping-page-morphs)

### Permanent elements

#### index.html.erb

```erb
<div data-reflex-permanent>
  <iframe src="https://ghbtns.com/github-btn.html?user=hopsoft&repo=stimulus_reflex&type=star&count=true" frameborder="0" scrolling="0" class="ghbtn"></iframe>
  <iframe src="https://ghbtns.com/github-btn.html?user=hopsoft&repo=stimulus_reflex&type=fork&count=true" frameborder="0" scrolling="0" class="ghbtn"></iframe>
</div>
```
<!-- {: .-wrap} -->

Add `data-reflex-permanent` to leave an element unchanged by full-page updates and morphs.

See: [Permanent elements](https://v3-4-docs.docs.stimulusreflex.com/guide/morph-modes#permanent-elements)

### Aborting a reflex

#### comment_reflex.rb

```ruby
class CommentReflex < ApplicationReflex
  before_reflex :halt

  def create
    # ...

  end

  private

  def halt
    raise :abort
  end
end
```

Call `raise :abort` in a `before_reflex` callback to cancel a Reflex.

See: [Aborting a reflex](https://v3-4-docs.docs.stimulusreflex.com/guide/reflexes#aborting-a-reflex)
