---
title: Minitest
subtitle: Lightweight Ruby test suite
category: Ruby
last_verified_with: "Minitest 6.1.0, minitest-mock 5.27.0, minitest-reporters 1.8.0."
updated: 2026-11-25
tier: t3
intro: |
  [Minitest](https://github.com/minitest/minitest) is a lightweight Ruby testing
  library. This sheet covers spec syntax, assertions, mocks, and reporters.
links:
  - title: Minitest on GitHub
    url: https://github.com/minitest/minitest
  - title: Minitest API documentation
    url: https://docs.seattlerb.org/minitest/
---

### Usage

```ruby
require 'minitest/autorun'

describe "X" do
  before do .. end
  after do .. end
  subject { .. }
  let(:list) { Array.new }

  it "should work" do
    assert true
  end
end
```
<!-- {: data-highlight="describe; before; after; let"} -->

See: [Unit tests](https://github.com/minitest/minitest/blob/master/README.rdoc#unit-tests)

### Specs (.must/.wont)

```ruby
expect(x)
.must_be :==, 0
.must_equal b
.must_be_close_to 2.99999
.must_be_same_as b

.must_include needle
.must_be_empty

.must_be_kind_of
.must_be_instance_of
.must_be_nil
.must_match /regex/
.must_be :<=, 42
.must_respond_to msg

.must_be_silent  ( proc { "no stdout or stderr" }.must_be_silent)
.must_output "hi"

proc { ... }.must_output out_or_nil [, err]
proc { ... }.must_raise exception
proc { ... }.must_throw sym
```
<!-- {: data-highlight="must_equal"} -->

See: [Specs](https://github.com/minitest/minitest/blob/master/README.rdoc#specs)

### Test

```ruby
class TestHipster < Minitest::Test
  def setup
    @subject = ["silly hats", "skinny jeans"]
  end

  def teardown
    @hipster.destroy!
  end

  def test_for_helvetica_font
    assert_equal "helvetica!", @hipster.preferred_font
  end

  def test_not_mainstream
    refute @hipster.mainstream?
  end
end
```
<!-- {: data-highlight="Minitest::Test"} -->

See: [Minitest::Test](https://docs.seattlerb.org/minitest/Minitest/Test.html)

### Assertions

```ruby
assert
assert_block { ... }
assert_empty
assert_equal 2, @size
assert_in_delta @size, 1, 1
assert_in_epsilon
assert_includes @list, "item"
assert_instance_of Array, @list
assert_kind_of Enumerable, @list
assert_match @str, /regex/
assert_nil
assert_operator @n, :==, 0
assert_output
assert_raises
assert_respond_to
assert_same
assert_send
assert_silent
assert_throws
```
<!-- {: data-highlight="assert_equal"} -->

See: [Assertions](https://docs.seattlerb.org/minitest/Minitest/Assertions.html)

### Minitest::Mock

```ruby
require 'minitest/autorun'
require 'minitest/mock'

describe Twipster, "Make every tweet a hipster tweet." do
  before do
    @twitter  = Minitest::Mock.new
    @twipster = Twipster.new(@twitter)
  end

  it "appends a hashtag and updates Twitter" do
    tweet = "Skyrim? Too mainstream."
    @twitter.expect :update, true, ["#{tweet} #lolhipster"]
    @twipster.submit(tweet)
    assert @twitter.verify
  end
end
```
<!-- {: data-highlight="@twitter.expect; @twitter.verify"} -->

Minitest 6 ships mocks separately; set expectations with `expect` and check them with `verify`.

See: [minitest-mock](https://github.com/minitest/minitest-mock)

### Reporters

```ruby
gem 'minitest-reporters'

require 'minitest/reporters'
Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new

[Default, Spec, Progress, RubyMate, RubyMine, JUnit]
```
<!-- {: data-highlight="Minitest::Reporters.use!; SpecReporter"} -->

See: [minitest-reporters](https://github.com/minitest-reporters/minitest-reporters)
