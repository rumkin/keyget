# Keyget

[![npm](https://img.shields.io/npm/v/keyget.svg?style=flat-square)](https://npmjs.com/package/keyget)
[![Travis](https://img.shields.io/travis/rumkin/keyget.svg?style=flat-square)](https://travis-ci.org/rumkin/keyget)

Tiny kit for nested objects modification. It can find, get, set, push or call
nested properties, create bindings, destructure objects and a little bit more.

## ToC
<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`get()`](#get)
  - [`set()`](#set)
  - [`has()`](#has)
  - [`call()`](#call)
  - [`method()`](#method)
  - [`breadcrumbs()`](#breadcrumbs)
  - [`structure()`](#structure)
  - [`at()`](#at)
  - [`Path`](#path)
  - [`PathArray`](#patharray)
- [License](#license)

<!-- /TOC -->


## Installation

Install via npm:

```shell
npm i keyget
```

## Usage

Update nested object:

```javascript
import {get, set, has} from 'keyget';

const target = {};

if (! has(target, ['user', 'name'])) {
  set(target, ['user', 'name'], 'Rick Sanchez');
}

get(target, ['user', 'name']); // -> 'Rick Sanchez'
target; // -> {user: {name: 'Rick Sanchez'}}
```

## API

Every method accepts path argument. It should has [Path](#path) or [PathArray](#patharray) type.

### `get()`

```
(target: *, path: Path) -> *
```

Get deeply nested property from `target` by `path`, which could be a string
with dot as separator or array of path segments.

Returns property value or undefined if there is no such property.

### `set()`
```
(target: *, path: Path, value: * ) -> null
```

Set value into `target`. If any `target`'s property on the `path` is not an object,
replaces it with the new plain object.

Returns `target`.

### `has()`

```
(target: *, path: Path) -> Boolean
```

Check wether `path` exists in a `target`.

### `call()`

```
(target: *, path: Path, arguments: Array) -> *
```

Call nested method with proper `this` context.

Returns methods result or undefined if method not exists.

### `method()`

```
(target: *, path: Path) -> function
```

Get nested method of `target` by `path` and returns method binding with `this`
context set to method's owner object. If method not found, returns empty
function.

### `breadcrumbs()`

```
(target: *, path: Path) -> []*
```

Returns values for each path segment. The first element is always `target`
itself.

```javascript
const target = {
    a: {
        b: {
            c: 1,
        },
    },
};

breadcrumbs(target, ['a', 'b']); // -> [{a: {b: {c: 1}}}, {b: {c: 1}}, {c: 1}]
```

### `structure()`

```
(target: *) -> []{path: PathArray, value: *}
```

Present `target` as list of paths and values.

Example:

```javascript
const struct = structure({
    a: {
        b: {1},
    }
});

struct; // -> [{path: ['a', 'b'], value: 1}]
```

### `at()`

```
(target: *, path: Path, update: UpdateFunc) -> *

UpdateFunc:
  (target: *, key: Number|String) -> *
```

Update deeply nested property of `target` by `path` using `update` function.
Result of `update` will be used as value of last ancestor. Returns updated
`target`.

### `Path`
```
String|PathArray
```

Examples:
```javascript
// String: Dot separated paths
'user.name';
'user.friends.0.id';
// PathArray: array of keys and indexes
['user', 'name'];
['user', 'friends', 0, 'id'];
```

### `PathArray`
```
[]<String|Number>
```

Examples:
```javascript
['user', 'name'];
['user', 'friends', 0, 'id'];
```

## License

MIT © [Rumkin](https://rumk.in)
