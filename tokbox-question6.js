function EventHandler() {
    this.handlers = {};

    this.addHandler = function (type, handler) {
        if(typeof(handler) !== 'function') {
            throw new Error('Handler is not a function');
        }

        if(typeof(type) !== 'string') {
            throw new Error('Type is not a string');
        }

        let typeArray = type.split(' ');

        typeArray.forEach(_type => {
            if(!this.handlers[_type]) {
            this.handlers[_type] = [];
            }

            this.handlers[_type].push(handler);
        });
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
        this.handlers[type] = this.handlers[type].filter(_handler => !(_handler.toString() === handler.toString()));
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

// Single type
obj1.on('bar', bar);

// Multiple types
obj1.on('foo foo2', () => console.log('foo1 and foo2'));


obj1.trigger('foo');
obj1.trigger('foo2');
obj1.trigger('bar');



