function EventHandler() {
    this.handlers = {};

    this.addHandler = function (type, handler) {
        if(typeof(handler) !== 'function') {
            throw new Error('Handler is not a function');
        }

        if(!this.handlers[type]) {
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    }
}

EventHandler.prototype.trigger = function(type, ...args) {
    if (this.handlers[type]) {
        this.handlers[type].forEach(handler => handler(...args));
    }
};

EventHandler.prototype.on = function(type, handler = undefined) {
    if(typeof(type) === 'object') {
        Object.keys(type).forEach((key) => {
            this.addHandler(key, type[key]);
        })
    } else {
        this.addHandler(type, handler);
    }
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

let bar = function() {
    // do foo
    console.log('bar');
};

// As objects
obj1.on({foo: () => console.log('foo')});
obj1.on({bar: bar});

// The old way
obj1.on('foo2', () => console.log('foo2'));

obj1.trigger('foo');
obj1.trigger('bar');
obj1.trigger('foo2');


