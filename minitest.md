---
title: Minitest
layout: default
---

### Usage

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

### Specs

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

Wont is the inverse of must:

    a.must_equal b
    a.wont_equal b


