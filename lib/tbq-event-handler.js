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
};

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
        // TODO: Problematic comparison with strings, find a better way
        this.handlers[type] = this.handlers[type].filter(_handler => !(_handler.toString() === handler.toString()));
    }
};

module.exports = EventHandler;


