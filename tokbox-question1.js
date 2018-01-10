// Using prototypical inheritance

function EventHandler() {
    this.handlers = {};
}

EventHandler.prototype.trigger = function(type) {
    if (this.handlers[type]) {
        this.handlers[type]();
    }
};

EventHandler.prototype.on = function(type, handler) {
    if(typeof(handler) !== 'function') {
        throw new Error('Handler is not a function');
    }

    this.handlers[type] = handler;
};

function MyCustomWidget() {
    EventHandler.call(this);
}

MyCustomWidget.prototype = EventHandler.prototype;

function AnotherCustomWidget() {
    EventHandler.call(this);
}

AnotherCustomWidget.prototype = EventHandler.prototype;

// Using Classes
// class EventHandler {
//
//     constructor() {
//         this.handlers = {};
//     }
//
//     on (type, handler) {
//         if(typeof(handler) !== 'function') {
//             throw new Error('Handler is not a function');
//         }
//
//         this.handlers[type] = handler;
//     }
//
//     trigger(type) {
//         if (this.handlers[type]) {
//             this.handlers[type]();
//         }
//     };
// }
//
// class MyCustomWidget extends EventHandler {
//     constructor() {
//         super();
//     }
//
// }
//
// class AnotherCustomWidget extends EventHandler {
//     constructor() {
//         super();
//     }
// }

let obj1 = new MyCustomWidget();

obj1.on('foo', function() {
    // do foo
    console.log('foo');
});

obj1.trigger('foo');

let obj2 = new AnotherCustomWidget();

obj2.on('bar', function() {
    // do foo
    console.log('bar');
});

obj2.trigger('bar');