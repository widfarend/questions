const EventHandler = require('./tbq-event-handler');

function MyCustomWidget() {
    EventHandler.call(this);
}

MyCustomWidget.prototype = EventHandler.prototype;

module.exports = MyCustomWidget;



