title: RSpec
----

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

### Mocking a class

    user_mock = mock "User"
    user_mock.should_receive(:authenticate).with("password").and_return(true)
    user_mock.should_receive(:coffee).exactly(3).times.and_return(:americano)
    user_mock.should_receive(:coffee).exactly(5).times.and_raise(NotEnoughCoffeeExcep
    ion)

    people_stub = mock "people"
    people_stub.stub!(:each).and_yield(mock_user)
    people_stub.stub!(:bad_method).and_raise(RuntimeError)

    user_stub = mock_model("User", :id => 23, :username => "pat", :email =>
    "pat@example.com")

    my_instance.stub!(:msg).and_return(value)
    MyClass.stub!(:msg).and_return(value)
