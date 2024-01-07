# difference

@golden-tiger/difference

## What is `difference`


`difference` function will find out what is different between two javascript `object`. (P.s. `number`, `string` and `boolean` are also javascript `object`)

## How to use `difference(before, after, option)`

Use `difference` function to get differences between the first parameter `before` and the second `after`. And `difference` function's third parameter control difference's process.

  - `before`: the before value for difference

  - `after`: the after value for difference

  - `option.routes`: initial routes

  - `option.arrayInOrder`: weather array needs keep order when contrast

  - `option.arraySort sort`: function when array keeps order

  - `option.covers`: Covers' array to custom specific contrast handler for specific routes. Handle function's return should be an array consisted of difference item(`{ routes, before, after }`) or a falsy value. Handle function's return will be pushed into the diff results array when it is not a falsy value.

  - **return**: Array of difference item. Difference item consists of routes (routes in object), before (before value) and after (after value).

## Examples

### type

1. number

```js
difference(1, 1);
// []
difference(1, 2);
// [ { routes: [], before: 1, after: 2 } ]
```

2. string

```js
difference('foo', 'foo');
// []
difference('foo', 'bar');
// [ { routes: [], before: 'foo', after: 'bar' } ]
```

3. boolean

```js
difference(true, true);
// []
difference(false, false);
// []
difference(true, false);
// [ { routes: [], before: true, after: false } ]
```

4. array

  > `option.arrayInOrder`(boolean) decides whether an array is in order. Sort function is `(a, b) => a < b ? -1 : 1` by default, which can be set with `option.arraySort`(Function). `difference` function will take array's sorted result as input.

```js
difference([1, 'foo'], [1, 'foo']);
// []
difference([1, 'foo'], [2, 'bar']);
// [
//   { routes: [ '1' ], before: 'foo', after: 'bar' },
//   { routes: [ '0' ], before: 1, after: 2 }
// ]
```

```js
difference([1, 2], [2, 1]);
// []
difference([1, 2], [2, 1], {
  arrayInOrder: true,
});
// [
//   { routes: [ '1' ], before: 2, after: 1 },
//   { routes: [ '0' ], before: 1, after: 2 }
// ]
```

```js
difference(['foo', 'bar'], ['bar', 'foo']);
// []
difference(['foo', 'bar'], ['bar', 'foo'], {
  arrayInOrder: true,
});
// [
//   { routes: [ '1' ], before: 'bar', after: 'foo' },
//   { routes: [ '0' ], before: 'foo', after: 'bar' }
// ]
```

5. object

```js
difference({ a: 'foo' }, { a: 'foo' });
// []
difference({ a: 'foo' }, { a: 'bar' });
// [ { routes: [ 'a' ], before: 'foo', after: 'bar' } ]
difference({ a: 'foo' }, { b: 'foo' });
// [
//   { routes: [ 'b' ], before: undefined, after: 'foo' },
//   { routes: [ 'a' ], before: 'foo', after: undefined }
// ]
```

6. Date

```js
difference(new Date(), new Date());
// []
difference(new Date(), new Date('2019-08-23T00:00:00.000Z'));
// [
//   {
//     before: 2022-09-15T13:31:17.484Z,
//     after: 2019-08-23T00:00:00.000Z, // The day I met my girl
//     routes: []
//   }
// ]
```

7. RegExp

```js
difference(/foo/, /foo/);
// []
difference(/foo/, /bar/);
// [ { before: /foo/, after: /bar/, routes: [] } ]
```

### option

1. `option.covers`

  > `handler` function's falsy return will be ignore in difference result. Using `handler` function you can custom the difference result, such as ignoring some specific route value or combining several route values to one difference item.

```js
difference({ a: 'foo' }, { a: 'bar' }, {
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
});
// []
difference({ a: 'foo' }, { a: 'bar' }, {
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
});
// [ { routes: [ 'a' ], before: 'foo', after: 'bar' } ]
```
