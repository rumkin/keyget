# Keyget

[![npm](https://img.shields.io/npm/v/keyget.svg?style=flat-square)](https://npmjs.com/package/keyget)
[![Travis](https://img.shields.io/travis/rumkin/keyget.svg?style=flat-square)](https://travis-ci.org/rumkin/keyget)

Tiny kit for nested objects modification. It can find, get, set, push or call nested
properties.

## Installation

Install via npm:

```shell
npm i keyget
```

## Usage

Update nested object:

```javascript
const {get, set, has} = require('keyget');
const target = {};

if (! has(target, ['user', 'name'])) {
  set(target, ['user', 'name'], 'Rick Sanchez');
}

get(target, ['user', 'name']); // -> 'Rick Sanchez'
target; // -> {user: {name: 'Rick Sanchez'}}
```

## API

### `get()`

```
target:Object, path: String|[]String) -> *
```

Get deeply nested property from `target` by `path`, which could be a string
with dot as separator or array of path segments.

Returns property value or undefined if there is no such property.

### `set()`
```
(target: Object, path: String|[]String, value: * ) -> null
```

Set value into `target`. If any `target`'s property on the `path` is not an object,
replaces it with the new plain object.

Returns `target`.

### `has()`

```
(target: Object, path: String|[]String) -> Boolean
```

Check wether `path` exists in a `target`.

### `call()`

```
(target: Object, path: String|[]String, arguments: Array) -> *
```

Call nested method with proper `this` context.

Returns methods result or undefined if method not exists.

### `method()`

```
(target: Object, path: String|[]String) -> function
```

Get nested method of `target` by `path` and returns method binding with `this`
context set to method's owner object. If method not found, returns empty
function.

### `structure()`

```
(target: Object) -> []{path: []String, value: *}
```

Present `target` as list of paths and values.

## License

MIT.

## Copyright

Rumkin, 2016–2018.
