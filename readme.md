# Keyget

Is nested object modification kit. It can find, get, set, push or call nested
properties.

## Installation

Install via npm:

```shell
npm i keyget
```

## API

### get(target:Object, key:String|[]String) -> *

Get value from object. `key` could be string with dot as delimiter or array of
path segments.

### set(target:Object, key:String|[]String, value:* ) -> null

Set value into object. If some property in path is not an object replace it with
object.

### has(target:Object, key:String|[]String) -> Boolean

Check if key exists in object.

### call(target:Object, key:String|[]String, arguments:Array) -> *

Call nested method with proper `this` context.

### method(target:Object, key:String|[]String) -> function

Get function which calls nested method with proper `this` context.

## License

Licensed under MIT.
