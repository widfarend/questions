// -- Question 1 --



// I want to add event handling to my JavaScript project.

// I have multiple Objects that I want to add trigger,

// and on methods to. Here are my very simple implementations

// of those methods:



const handlers = {};



const trigger = (type) => {

    if (handlers[type]) {

        handlers[type]();

    }

};



const on = (type, handler) => {

    handlers[type] = handler;

};



// I want to use my event handling functions in lots of different places

// How can I reuse these functions without having to re-write them over and over again?



// So that I can do eg...



let obj1 = new MyCustomWidget();

obj1.on('foo', () => {

    // do foo

});

obj1.trigger('foo');



let obj2 = new AnotherCustomWidget();

obj2.on('bar', () => {

    // do bar

});

obj2.trigger('bar');



// Try to reuse code, I don't want to see the same code copy and pasted



function MyCustomWidget() {



}


class AnotherCustomWidget {



}



// -- Question 2 --



// Right now you can only have 1 event handler for each type. eg. in

// the following example only the second handler will be executed.



let obj1 = new MyCustomWidget();

obj1.on('foo', () => {

    // do foo

});

obj1.on('foo', () => {

    // do some other foo

});

obj1.trigger('foo');



// How would I modify my methods above to allow me to add multiple

// handlers for the same type?









// -- Question 3 --



// How would I add an off method that removes an event handler? It works like:

const doFoo = () => {

    // do Foo

};

let obj1 = new MyCustomWidget();

obj1.on('foo', doFoo);

obj1.off('foo', doFoo);





// -- Question 4 --



// How would I allow passing of additional arguments so that you could use eg.



obj1.on('foo', (bar) => {



});



obj1.trigger('foo', bar);



// or



obj1.on('foo', (bar1, bar2, bar3) => {



});



obj1.trigger('foo', bar1, bar2, bar3);







// -- Question 5 --



// How would I make this work?



obj1.on({

    foo: () => {

    // Handle the 'foo' event

},

    bar: () => {

    // Handle the 'bar' event

}

});









// -- Question 6 --



// How would I make this work?



obj1.on('foo bar', () => {

    // Handler for foo or bar event

});









// -- Question 7 --



// Add tests for this new functionality we have added



describe('MyCustomWidget', () => {

    let widget;



beforeEach(() => {

    widget = new MyCustomWidget();

});



it('has on and trigger methods', () => {

    expect(widget.on).toBeDefined();

expect(widget.trigger).toBeDefined();

});



it('calls the handler when an event is triggered', () => {

    const handler = jasmine.createSpy('handler');

widget.on('foo', handler);

widget.trigger('foo');

expect(handler).toHaveBeenCalled();

});



});