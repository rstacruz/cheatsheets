---
title: RSpec
layout: default
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
be_close value, tolerance

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
allow(die).to receive(:roll) { 3 }
```

https://relishapp.com/rspec/rspec-mocks/docs

## Subjects

    describe CheckingAccount, "with a non-zero balance" do
      subject(:account) { CheckingAccount.new }
      it { is_expected.not_to be_overdrawn }
    end
