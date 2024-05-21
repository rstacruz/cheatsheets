---
title: RSpec
category: Ruby
---

### About
{: .-intro}

RSpec is a Ruby library for testing.

- <https://rspec.info/>

### Invoking tests

```sh
rake -T spec      # List spec tasks

rake spec         # Run all

rake spec/models/mymodel_spec.rb
rake spec/models/mymodel_spec.rb:27
```

## Writing tests

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

### Before/after

```rb
before :each do
  # before all tests
end

before :all do
  # before this suite
end

after : all do
  # after this suite
end
```

### Subjects

```rb
subject { CheckingAccount.new }
it { is_expected.to be_empty }

# also names: subject(:account) { ... }
```

## Expectations

```rb
target.should eq 1
target.should_not eq 1

expect(target).to eq 1
expect(target).not_to eq 1
```

### Numeric

```rb
expect(5).to be < 6
expect(5).to == 5
expect(5).to equal value
expect(5).to be_between(1, 10)
expect(5).to be_within(0.05).of value
```

### Compound expectations

```rb
expect(1).to (be < 2).or be > 5
```

Use `or`/`and` to string multiple matchers together. See: [Compound expectations](https://relishapp.com/rspec/rspec-expectations/docs/compound-expectations)

### Comparison

```rb
expect(x).to be value
expect(x).to satisfy { |arg| ... }
expect(x).to match /regexp/
```

### Predicate

```rb
expect(x).to be_zero    # FixNum#zero?
expect(x).to be_empty   # Array#empty?
expect(x).to have_key   # Hash#has_key?
```

### Objects

```rb
expect(obj).to be_an_instance_of MyClass
expect(obj).to be_a_kind_of MyClass
expect(obj).to respond_to :save!
```

### Control flow

```rb
expect { user.save! }.to raise_error
expect { user.save! }.to raise_error(ExceptionName, /msg/)
expect { user.save! }.to throw :symbol
```

### Enumerables/arrays

```rb
expect(list).to include(<object>)

expect(list).to have(1).things
expect(list).to have_at_least(2).things
expect(list).to have_at_most(3).things

expect(list).to have(2).errors_on(:field)

expect(list).to contain_exactly(1, 2)
expect(list).to match_array([1, 2])
```

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

## Doubles

```rb
book = double('book')
book = instance_double('Book', pages: 250)
```

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
  .with(instance_of(Fixnum))
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

https://relishapp.com/rspec/rspec-mocks/docs

## Spec helpers

```rb
module UserSpecHelper
  def valid_user_attributes
    { :email => "joe@bloggs.com",
      :username => "joebloggs",
      :password => "abcdefg"}
  end
end
```

```rb
describe User do
  include UserSpecHelper

  ...
end
```
