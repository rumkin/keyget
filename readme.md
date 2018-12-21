# Keyget

Tiny kit for nested objects modification. It can find, get, set, push or call nested
properties.

## Installation

Install via npm:

```shell
npm i keyget
```

## API

### `get()`

```
target:Object, key:String|[]String) -> *
```

Get value from object. `key` could be string with dot as delimiter or array of
path segments.

### `set()`
```
(target: Object, key: String|[]String, value: * ) -> null
```

Set value into `target`. If any property in `path` is not an object,
replaces it with plain object.

Returns `target`.

### `has()`

```
(target:Object, key:String|[]String) -> Boolean
```

Check wether `path` exists in a `target`.

### `call()`

```
(target: Object, key:String|[]String, arguments: Array) -> *
```

Call nested method with proper `this` context.

Returns methods result or undefined if method not exists.

### `method()`

```
(target: Object, key: String|[]String) -> function
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

Licensed under MIT.
