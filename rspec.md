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

    # Can be .should or .should_not

    # Numeric
    target.should be < 6
    target.should == 5
    target.should equal value
    target.should be_between(1, 10)
    target.should be_close value, tolerance

    target.should be value
    target.should satisfy {|arg| ...}
    target.should predicate [optional args]
    target.should match regexp

    target.should be_an_instance_of <class>
    target.should be_a_kind_of <class>

    target.should respond_to <symbol>

    # Control flow
    proc.should raise_error
    proc.should raise_error(<exception> [, message])

    proc.should throw <symbol>

    # Enumerables/arrays
    target.should include <object>

    target.should have(<number>).things
    target.should have_at_least(<number>).things
    target.should have_at_most(<number>).things

    target.should have(<number>).errors_on(:field)

    # Change
    proc.should change(instance, method).from(number).to(number)

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

    double.should_receive(:msg).with(no_args())
    double.should_receive(:msg).with(any_args())
    double.should_receive(:msg).with(1, kind_of(Numeric), "b") #2nd argument can any kind of Numeric
    double.should_receive(:msg).with(1, boolean(), "b") #2nd argument can true or false
    double.should_receive(:msg).with(1, /abc/, "b") #2nd argument can be any String matching the submitted Regexp
    double.should_receive(:msg).with(1, anything(), "b") #2nd argument can be anything at all
    double.should_receive(:msg).with(1, ducktype(:abs, :div), "b") #2nd argument can be object that responds to #abs and #div

    double.should_receive(:msg).once
    double.should_receive(:msg).twice
    double.should_receive(:msg).exactly(n).times
    double.should_receive(:msg).at_least(:once)
    double.should_receive(:msg).at_least(:twice)
    double.should_receive(:msg).at_least(n).times
    double.should_receive(:msg).at_most(:once)
    double.should_receive(:msg).at_most(:twice)
    double.should_receive(:msg).at_most(n).times
    double.should_receive(:msg).any_number_of_times

