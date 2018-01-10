describe('MyCustomWidget', function() {
    var MyCustomWidget = require('../lib/tbq-custom-widget');
    let widget;

    beforeEach(function() {
        widget = new MyCustomWidget();
    });

    it('should have on and trigger methods', function() {
        expect(widget.on).toBeDefined();
        expect(widget.trigger).toBeDefined();
    });

    it('should call the handler when an event is triggered', function() {
        const handler = jasmine.createSpy('handler');

        widget.on('foo', handler);
        widget.trigger('foo');

        expect(handler).toHaveBeenCalled();
    });

    it('should call both handlers when an event is triggered', function() {
        const handler1 = jasmine.createSpy('handler1');
        const handler2 = jasmine.createSpy('handler2');

        widget.on('foo', handler1);
        widget.on('foo', handler2);
        widget.trigger('foo');

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
    });

    it('should not call handlers when an event is triggered after the event was removed', function() {
        const handler1 = jasmine.createSpy('handler1');
        const handler2 = jasmine.createSpy('handler2');

        widget.on('foo', handler1);
        widget.on('bar', handler2);
        widget.off('bar', handler2);
        widget.trigger('foo');
        widget.trigger('bar');

        expect(handler1).toHaveBeenCalled();
        expect(handler2).not.toHaveBeenCalled();
    });

    it('should call handler with multiple arguments', function() {
        const handler = jasmine.createSpy('handler');

        widget.on('foo', handler);
        widget.trigger('foo','i','got','called');

        expect(handler).toHaveBeenCalledWith('i','got','called');
    });

    it('should create a handler via an object', function() {
        const handler = jasmine.createSpy('handler');

        widget.on({foo: handler});
        widget.trigger('foo');

        expect(handler).toHaveBeenCalled();
    });


    it('should apply a handler to multiple types with one function call', function() {
        const handler = jasmine.createSpy('handler');

        widget.on('foo bar fooBar', handler);
        widget.trigger('foo', 'foo');
        widget.trigger('bar', 'bar');
        widget.trigger('fooBar', 'fooBar');

        // expect(handler).toHaveBeenCalledWith('foo', 'bar');
        expect(handler.calls.allArgs()).toEqual([['foo'], ['bar'], ['fooBar']]);
    });
});