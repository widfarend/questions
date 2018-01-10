function EventHandler() {
    this.handlers = {};
}

EventHandler.prototype.trigger = function(type, ...args) {
    if (this.handlers[type]) {
        this.handlers[type].forEach(handler => handler(...args));
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
        this.handlers[type] = this.handlers[type].filter(evhandler => !(evhandler.toString() === handler.toString()));
    }
};

function MyCustomWidget() {
    EventHandler.call(this);
}

MyCustomWidget.prototype = EventHandler.prototype;

let obj1 = new MyCustomWidget();

let foo = function(in1, in2) {
    // do foo
    console.log('foo2: ', in1, in2);
};

// No params
obj1.on('bar', () => {
    console.log('bar');
});

obj1.trigger('bar');

// One param
let fooVar = 'fooVar';

obj1.on('foo1', (foo) => {
    console.log('foo1: ', foo)
});

obj1.trigger('foo1', fooVar);

// Multiple params
obj1.on('foo2', foo);
obj1.trigger('foo2', 'hello', 'there');


