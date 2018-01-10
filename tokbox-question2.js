// Using prototypical inheritance

function EventHandler() {
    this.handlers = {};
}

EventHandler.prototype.trigger = function(type) {
    if (this.handlers[type]) {
        this.handlers[type].forEach(handler => handler());
    }
};

EventHandler.prototype.on = function(type, handler) {
    if(!this.handlers[type]) {
        this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
};

function MyCustomWidget() {
    EventHandler.call(this);
}

MyCustomWidget.prototype = EventHandler.prototype;


// Using Classes
// class EventHandler {
//
//     constructor() {
//         this.handlers = {};
//     }
//
//     on (type, handler) {
//         if(!this.handlers[type]) {
//             this.handlers[type] = [];
//         }
//         this.handlers[type].push(handler);
//     }
//
//     trigger(type) {
//         if (this.handlers[type]) {
//             this.handlers[type].forEach(handler => handler());
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

let obj1 = new MyCustomWidget();

obj1.on('foo', function() {
    // do foo
    console.log('foo 1');
});

obj1.trigger('foo');

obj1.on('foo', function() {
    // do foo
    console.log('foo 2');
});

obj1.trigger('foo');