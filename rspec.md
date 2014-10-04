---
title: RSpec
layout: default
---

### Invoking tests

    rake -T spec      # List spec tasks

    rake spec         # Run all

    rake spec/models/mymodel_spec.rb
    rake spec/models/mymodel_spec.rb:27

### Other spec tasks

    rake spec:controllers
    rake spec:helpers
    rake spec:lib
    rake spec:mailers
    rake spec:models
    rake spec:requests
    rake spec:routing
    rake spec:views


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

          subject.name = 'x'
          subject.name.should == 'x'
        end
      end
    end

### Expectations

    # Can be:
    #   target.should
    #   target.should_not
    #   expect(target).to

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

### Mocking - basic

    book.stub(:title) { "The RSpec Book" }
    book.stub(:title => "The RSpec Book")
    book.stub(:title).and_return("The RSpec Book")

    # First arg is a name, it's optional
    book = double("book", :title => "The RSpec Book")

### Mocking - consecutive return values

    die.stub(:roll).and_return(1,2,3)
    die.roll # => 1
    die.roll # => 2
    die.roll # => 3
    die.roll # => 3
    die.roll # => 3

### Expectations

    expect(double).to receive(:msg)
    expect(double).to receive(:msg).with(no_args())
    expect(double).to receive(:msg).with(any_args())
    expect(double).to receive(:msg).with(1, kind_of(Numeric), "b") #2nd argument can any kind of Numeric
    expect(double).to receive(:msg).with(1, boolean(), "b") #2nd argument can true or false
    expect(double).to receive(:msg).with(1, /abc/, "b") #2nd argument can be any String matching the submitted Regexp
    expect(double).to receive(:msg).with(1, anything(), "b") #2nd argument can be anything at all
    expect(double).to receive(:msg).with(1, ducktype(:abs, :div), "b") #2nd argument can be object that responds to #abs and #div

    expect(double).to receive(:msg).once
    expect(double).to receive(:msg).twice
    expect(double).to receive(:msg).exactly(n).times
    expect(double).to receive(:msg).at_least(:once)
    expect(double).to receive(:msg).at_least(:twice)
    expect(double).to receive(:msg).at_least(n).times
    expect(double).to receive(:msg).at_most(:once)
    expect(double).to receive(:msg).at_most(:twice)
    expect(double).to receive(:msg).at_most(n).times
    expect(double).to receive(:msg).any_number_of_times

