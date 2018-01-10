const MyCustomWidget = require('./lib/tbq-custom-widget');

let obj1 = new MyCustomWidget();

// let bar = function() {
//     // do foo
//     console.log('bar');
// };
//
// // Single type
// obj1.on('bar', bar);
//
// // Multiple types
// obj1.on('foo foo2', () => console.log('foo1 and foo2'));
//
//
// obj1.trigger('foo');
// obj1.trigger('foo2');
// obj1.trigger('bar');

obj1.on('foo', () => console.log('foo1'));
obj1.on('foo', () => console.log('foo2'));
obj1.off('foo', () => console.log('foo1'));
obj1.trigger('foo');



