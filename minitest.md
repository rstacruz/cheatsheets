title: Minitest
---

### Usage

    require 'minitest/autorun'

    describe "X" do
      it "should work" do
        assert true
      end
    end

### Specs

    a.must_equal b
    3.must_be_close_to 2.99999

    collection.must_include needle
    collection.must_be_empty

    .must_be_kind_of
    .must_match
    a.must_be :<=, 42
    obj.must_respond_to msg
    a.must_be_same_as b

    proc { ... }.must_output out_or_nil [, err]
    proc { ... }.must_raise exception
    proc { ... }.must_throw sym

Wont is the inverse of must:

    a.must_equal b
    a.wont_equal b


