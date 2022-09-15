const { difference } = require('../dist');

console.log(difference(1, 1));
// []

console.log(difference(1, 2));
// [ { routes: [], before: 1, after: 2 } ]

console.log(difference('foo', 'foo'));
// []
console.log(difference('foo', 'bar'));
// [ { routes: [], before: 'foo', after: 'bar' } ]

console.log(difference(true, true));
// []
console.log(difference(false, false));
// []
console.log(difference(true, false));
// [ { routes: [], before: true, after: false } ]

console.log(difference([1, 'foo'], [1, 'foo']));
// []
console.log(difference([1, 'foo'], [2, 'bar']));
// [
//   { routes: [ '1' ], before: 'foo', after: 'bar' },
//   { routes: [ '0' ], before: 1, after: 2 }
// ]
console.log(difference([1, 2], [2, 1]));
// []
console.log(difference([1, 2], [2, 1], {
  arrayInOrder: true,
}));
// [
//   { routes: [ '1' ], before: 2, after: 1 },
//   { routes: [ '0' ], before: 1, after: 2 }
// ]
console.log(difference(['foo', 'bar'], ['bar', 'foo']));
// []
console.log(difference(['foo', 'bar'], ['bar', 'foo'], {
  arrayInOrder: true,
}));
// [
//   { routes: [ '1' ], before: 'bar', after: 'foo' },
//   { routes: [ '0' ], before: 'foo', after: 'bar' }
// ]

console.log(difference({ a: 'foo' }, { a: 'foo' }));
// []
console.log(difference({ a: 'foo' }, { a: 'bar' }));
// [ { routes: [ 'a' ], before: 'foo', after: 'bar' } ]
console.log(difference({ a: 'foo' }, { b: 'foo' }));
// [
//   { routes: [ 'b' ], before: undefined, after: 'foo' },
//   { routes: [ 'a' ], before: 'foo', after: undefined }
// ]

console.log(difference({ a: 'foo' }, { a: 'bar' }, {
  covers: [
    {
      routes: ['a'],
      handler: (before, after, routes) => {
        console.log(before);
        // foo
        console.log(after);
        // bar
        console.log(routes);
        // [ 'a' ]
        return false;
      },
    }
  ],
}));
// []
console.log(difference({ a: 'foo' }, { a: 'bar' }, {
  covers: [
    {
      routes: ['a'],
      handler: (before, after, routes) => {
        return [
          { routes, before, after },
        ];
      },
    }
  ],
}));
// [ { routes: [ 'a' ], before: 'foo', after: 'bar' } ]

console.log(difference(new Date(), new Date()));
// []
console.log(difference(new Date(), new Date('2019-08-23T00:00:00.000Z')));
// [
//   {
//     before: 2022-09-15T13:31:17.484Z,
//     after: 2019-08-23T00:00:00.000Z, // The day I met my girl
//     routes: []
//   }
// ]

console.log(difference(/foo/, /foo/));
// []
console.log(difference(/foo/, /bar/));
// [ { before: /foo/, after: /bar/, routes: [] } ]
