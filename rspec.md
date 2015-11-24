---
title: RSpec
category: Ruby
---

### Invoking tests

    rake -T spec      # List spec tasks

    rake spec         # Run all

    rake spec/models/mymodel_spec.rb
    rake spec/models/mymodel_spec.rb:27

### Spec helpers

    module UserSpecHelper
      def valid_user_attributes
        { :email => "joe@bloggs.com",
          :username => "joebloggs",
          :password => "abcdefg"}
      end
    end

### A test

    describe "A User (in general)" do
      include UserSpecHelper

      before(:each) do
        @user = User.new
      end

      subject {
        Person.new
      }

      context "setter methods" do
        it "should do this" do
          pending "some other thing"

          expect(subject.name).to eq 'x'
        end
      end
    end

### Expectations

```rb
target.should eq 1
target.should_not eq 1
expect(target).to eq 1
expect(target).not_to eq 1
```

```rb
# Numeric
be < 6
== 5
equal value
be_between(1, 10)
be_within(0.05).of value

be value
satisfy {|arg| ...}
predicate [optional args]
match regexp

be_an_instance_of <class>
be_a_kind_of <class>

respond_to <symbol>

# Control flow
raise_error
raise_error(<exception> [, message])

throw <symbol>

# Enumerables/arrays
include <object>

have(<number>).things
have_at_least(<number>).things
have_at_most(<number>).things

have(<number>).errors_on(:field)

# Change
change(instance, method).from(number).to(number)

# proc.should <=> expect(&proc).to
expect { thing.approve! }.to change(thing, :status).
    from(Status::AWAITING_APPROVAL).
    to(Status::APPROVED)

expect { thing.destroy }.to change(Thing, :count).by(-1)
```

### Double

```rb
book = double('book')
book = instance_double('Book', pages: 250)
```

### Method stubs

```rb
allow(die).to receive(:roll)
allow(die).to receive(:roll) { 3 }

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

## Subjects

    describe CheckingAccount, "with a non-zero balance" do
      subject(:account) { CheckingAccount.new }
      it { is_expected.not_to be_overdrawn }
    end
