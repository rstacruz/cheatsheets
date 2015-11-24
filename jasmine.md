---
title: Jasmine
category: JavaScript libraries
---

    describe("A suite", function() {
      it("contains spec with an expectation", function() {
        expect(true).toBe(true);
      });
    });

### Expectations

    expect(true).toBe(true)
    expect(true).not.toBe(true)

    expect(a).toEqual(bar)

    expect(message).toMatch(/bar/)
    expect(message).toMatch('bar')

    expect(a.foo).toBeDefined()
    expect(a.foo).toBeUndefined()
    expect(a.foo).toBeNull()

    expect(a.foo).toBeTruthy()
    expect(a.foo).toBeFalsy()

    expect(message).toContain('hello')

    expect(pi).toBeGreaterThan(3)
    expect(pi).toBeLessThan(4)
    expect(pi).toBeCloseTo(3.1415, 0.1)

    expect(func).toThrow()

### Blocks

    beforeEach(function() { ... });
    afterEach(function() { ... });

### Pending

    xit("this is a pending test", function() { ... })
    xdescribe("this is a pending block", function() { ... })

### Spies

    spyOn(foo, 'setBar')
    spyOn(foo, 'setBar').andReturn(123)
    spyOn(foo, 'getBar').andCallFake(function() { return 1001; })
    foo.setBar(123)

    expect(foo.setBar).toHaveBeenCalled()
    expect(foo.setBar).toHaveBeenCalledWith(123)
    expect(foo.setBar.calls.length).toEqual(2)
    expect(foo.setBar.calls[0].args[0]).toEqual(123)

### Creating spies

    stub = jasmine.createSpy('stub')
    stub("hello")

    expect(stub.identity).toEqual("stub")
    expect(stub).toHaveBeenCalled()

### Async

    it("should run async", function() {
      var flag = false, value = 0;

      runs(function() {
        setTimeout(function() { flag = true; }, 500);
      });

      waitsFor(function() {
        value++;
        return flag;
      }, "increment", 750);

      runs(function() {
        expect(value).toBeGreaterThan(0);
      });
    });

### HTML runner

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 250;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    $(function() { jasmineEnv.execute(); });

Jasmine jQuery
==============

[Jasmin jQuery](https://github.com/velesin/jasmine-jquery).

    expect($('#id')).toBe('div')
    expect($('input[type=checkbox]')).toBeChecked()
    expect($('input[type=checkbox]')).toBeDisabled()
    expect($('input[type=checkbox]')).toBeFocused()
    expect($('#menu ul')).toBeEmpty()

    expect($('#toolbar')).toBeHidden()
    expect($('#toolbar')).toBeVisible()

    expect($('#popup')).toHaveCss({ margin: "10px" })
    expect($('option')).toBeSelected()

    expect($('.foo')).toExist()

    expect($('a')).toHaveAttr('rel')
    expect($('a')).toHaveAttr('rel', 'nofollow')

    expect($('a')).toHaveClass('rel')
    expect($('a')).toHaveId('home')

    expect($('a')).toHaveHtml('<span></span>')
    expect($('a')).toContainHtml('<span></span>')
    expect($('a')).toHaveText('hi')

    expect($form).toHandle('submit') // event
    expect($form).toHandleWith('submit', onSumbit)

### Event spies

    spyOnEvent($('#some_element'), 'click');
    $('#some_element').click();
    expect('click').toHaveBeenPreventedOn($('#some_element'));
    expect('click').toHaveBeenTriggeredOn($('#some_element'));

### Reference

 * http://pivotal.github.com/jasmine/
