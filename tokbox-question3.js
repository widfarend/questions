function EventHandler() {
    this.handlers = {};
}

EventHandler.prototype.trigger = function(type) {
    if (this.handlers[type]) {
        this.handlers[type].forEach(handler => handler());
    }
};

EventHandler.prototype.on = function(type, handler) {
    if(typeof(handler) !== 'function') {
        throw new Error('Handler is not a function');
    }

    if(!this.handlers[type]) {
        this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
};

EventHandler.prototype.off = function(type, handler) {
    if(typeof(handler) !== 'function') {
        throw new Error('Handler is not a function');
    }

    if(this.handlers[type]) {
        // TODO: Problematic comparison with strings, find a better way
        this.handlers[type] = this.handlers[type].filter(evhandler => !(evhandler.toString() === handler.toString()));
    }
};

function MyCustomWidget() {
    EventHandler.call(this);
}

MyCustomWidget.prototype = EventHandler.prototype;

let obj1 = new MyCustomWidget();

let foo = function() {
    // do foo
    console.log('foo');
};

let foo2 = function() {
    // do foo
    console.log('foo2');
};

let bar = function() {
    // do foo
    console.log('bar');
};

obj1.on('foo', foo);
obj1.on('foo', foo2);
obj1.on('bar', bar);

obj1.trigger('foo');
obj1.trigger('bar');

obj1.off('foo', foo);
obj1.off('bar', bar);

obj1.trigger('foo');
obj1.trigger('bar');
