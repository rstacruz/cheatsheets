---
title: Minitest
category: Ruby
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

### Specs (.must/.wont)

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

### Test

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

### Assertions

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

### Minitest::Mock

A simple and clean mock system. There two essential methods at our disposal: expect and verify.

    require 'minitest/autorun'

    describe Twipster, "Make every tweet a hipster tweet." do
      before do
        @twitter  = Minitest::Mock.new
        @twipster = Twipster.new(@twitter)
      end

      it "should append a #lolhipster hashtag and update Twitter with our status" do
        tweet = "Skyrim? Too mainstream."
        @twitter.expect :update, true, ["#{tweet} #lolhipster"]
        @twipster.submit(tweet)
        assert @twitter.verify # verifies tweet and hashtag was passed to `@twitter.update`
      end
    end

### Reporters

    gem 'minitest-reporters'

    require 'minitest/reporters'
    Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new

    [Default, Spec, Progress, RubyMate, RubyMine, JUnit]
