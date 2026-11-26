---
title: RSpec
subtitle: Ruby testing library
category: Ruby
intro: |
  RSpec is a Ruby library for testing.
links:
  - title: https://rspec.info/
    url: https://rspec.info/
tier: t3
last_verified_with: "RSpec 3.13, rspec-mocks 3.13.8."
updated: 2026-11-26
---

### Invoking tests

```sh
rake -T spec      # List spec tasks

rake spec         # Run all

rake spec/models/mymodel_spec.rb
rake spec/models/mymodel_spec.rb:27
```
<!-- {: data-highlight="rake spec"} -->

See: [Rake task](https://rspec.info/features/3-13/rspec-core/command-line/rake-task/)

## Writing tests

### Describe blocks

```rb
describe "A User (in general)" do
  include UserSpecHelper

  subject { Person.new }

  let(:admin) { Person.new(role: :admin) }

  context "setter methods" do
    it "should do this" do
      pending "some other thing"

      expect(subject.name).to eq 'x'
    end
  end
end
```
<!-- {: data-highlight="describe"} -->

See: [Basic structure](https://rspec.info/features/3-13/rspec-core/example-groups/basic-structure/)

### Before/after

```rb
before :each do
  # before all tests
end

before :all do
  # before this suite
end

after :all do
  # after this suite
end
```
<!-- {: data-highlight="before :each; before :all; after :all"} -->

See: [Before and after hooks](https://rspec.info/features/3-13/rspec-core/hooks/before-and-after-hooks/)

### Subjects

```rb
subject { CheckingAccount.new }
it { is_expected.to be_empty }

# also names: subject(:account) { ... }
```
<!-- {: data-highlight="subject { CheckingAccount.new }"} -->

See: [Subject](https://rspec.info/features/3-13/rspec-core/subject/)

## Expectations

### Syntax

```rb
target.should eq 1
target.should_not eq 1

expect(target).to eq 1
expect(target).not_to eq 1
```
<!-- {: data-highlight="expect(target).to eq 1"} -->

See: [Expectations](https://rspec.info/features/3-13/rspec-expectations/)

### Numeric

```rb
expect(5).to be < 6
expect(5).to eq 5
expect(5).to equal value
expect(5).to be_between(1, 10)
expect(5).to be_within(0.05).of value
```
<!-- {: data-highlight="be_between; be_within"} -->

See: [Comparisons](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/comparisons/)

### Compound expectations

```rb
expect(1).to (be < 2).or be > 5
```
<!-- {: data-highlight=".or"} -->

See: [Compound expectations](https://rspec.info/features/3-13/rspec-expectations/compound-expectations/)

### Comparison

```rb
expect(x).to be value
expect(x).to satisfy { |arg| ... }
expect(x).to match /regexp/
```
<!-- {: data-highlight="satisfy"} -->

See: [satisfy](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/satisfy/)

### Predicate

```rb
expect(x).to be_zero    # Integer#zero?
expect(x).to be_empty   # Array#empty?
expect(x).to have_key   # Hash#has_key?
```
<!-- {: data-highlight="be_zero; be_empty; have_key"} -->

See: [Predicates](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/predicates/)

### Objects

```rb
expect(obj).to be_an_instance_of MyClass
expect(obj).to be_a_kind_of MyClass
expect(obj).to respond_to :save!
```
<!-- {: data-highlight="be_an_instance_of; be_a_kind_of"} -->

See: [Types](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/types/)

### Control flow

```rb
expect { user.save! }.to raise_error
expect { user.save! }.to raise_error(ExceptionName, /msg/)
expect { user.save! }.to throw :symbol
```
<!-- {: data-highlight="raise_error; throw"} -->

See: [Raise error](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/raise-error/)

### Enumerables/arrays

```rb
expect(list).to include(<object>)

expect(list.size).to eq 1
expect(list.size).to be >= 2
expect(list.size).to be <= 3

expect(list.errors[:field].size).to eq 2

expect(list).to contain_exactly(1, 2)
expect(list).to match_array([1, 2])
```
<!-- {: data-highlight="contain_exactly"} -->

See: [Contain exactly](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/contain-exactly/)

### Change

```rb
expect { thing.approve! }.to \
  change(thing, :status)
  .from(Status::AWAITING_APPROVAL)
  .to(Status::APPROVED)

expect { thing.destroy }.to \
  change(Thing, :count)
  .by(-1)
```
<!-- {: data-highlight="change"} -->

See: [Change](https://rspec.info/features/3-13/rspec-expectations/built-in-matchers/change/)

## Doubles

### Creating doubles

```rb
book = double('book')
book = instance_double('Book', pages: 250)
```
<!-- {: data-highlight="double; instance_double"} -->

See: [Test doubles](https://rspec.info/features/3-13/rspec-mocks/basics/test-doubles/)

### Method stubs

```rb
allow(die).to receive(:roll)
allow(die).to receive(:roll) { 3 }
allow_any_instance_of(Die).to receive(:roll)

expect(die).to receive(:roll)
  .with(1)
  .with(1, true)
  .with(boolean)
  .with(anything)
  .with(any_args)
  .with(1, any_args)
  .with(no_args)
  .with(hash_including(a: 1))
  .with(hash_excluding(a: 1))
  .with(array_including(:a, :b))
  .with(array_excluding(:a, :b))
  .with(instance_of(Integer))
  .with(kind_of(Numeric))
  .with(<matcher>)

  .once
  .twice
  .exactly(n).times
  .at_least(:once)
  .at_least(:twice)
  .at_least(n).times
  .at_most(:once)
  .at_most(:twice)
  .at_most(n).times
```
<!-- {: data-highlight="allow(die).to receive(:roll)"} -->

See: [Expecting messages](https://rspec.info/features/3-13/rspec-mocks/basics/expecting-messages/)

## Spec helpers

### Helper modules

```rb
module UserSpecHelper
  def valid_user_attributes
    { :email => "joe@bloggs.com",
      :username => "joebloggs",
      :password => "abcdefg"}
  end
end
```
<!-- {: data-highlight="UserSpecHelper"} -->

See: [Modules](https://rspec.info/features/3-13/rspec-core/helper-methods/modules/)

### Including helpers

```rb
describe User do
  include UserSpecHelper

  ...
end
```
<!-- {: data-highlight="include UserSpecHelper"} -->

See: [Helper methods](https://rspec.info/features/3-13/rspec-core/helper-methods/)
