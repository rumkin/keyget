exports.get = getByPath;
exports.set = setByPath;
exports.has = hasPath;
exports.push = pushByPath;
exports.method = methodByPath;
exports.call = callByPath;
exports.select = selectValues;
exports.structure = getStructure;

/**
 * Extract nested value by path and return as array. If target is not an object
 * or path is empty returns empty array.
 *
 * @param  {*} target Value.
 * @param  {string[]} path   Path to value.
 * @return {*[]}        Values for path components.
 * @example
 *
 * selectValues({a: b: {1}}, ['a', 'b']); // -> [{b:1}, 1];
 */
function selectValues(target, path) {
  if (! Array.isArray(path)) {
    throw new Error('Path should be an array');
  }

  const result = [];
  let part;
  let value = target;

  if (! isObject(value)) {
    return result;
  }

  for (let i = 0, l = path.length; i < l; i++) {
    part = path[i];

    if (! value.hasOwnProperty(part)) {
      break;
    }

    result.push(value[part]);

    value = value[part];
  }

  return result;
}

/**
 * setValue - Set value into object with values map.
 *
 * @param {*} target Target value.
 * @param {*[]} values Array of values.
 * @param {string[]} path   Path to value.
 * @param {*} value  value to set into target.
 * @return {void}
 * @private
 */
function setValue(target, values, path, value) {
  if (! path.length) {
    return target;
  }

  for (let i = 0, l = path.length - 1; i < l; i++) {
    if (values.length < i) {
      target[path[i]] = {};
    }
    else if (! isObject(target[path[i]])) {
      target[path[i]] = {};
    }
    target = target[path[i]];
  }

  target[path[path.length - 1]] = value;
  return target;
}

/**
 * hasPath - Set deeply nested value into target object. If nested properties
 * are not an objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path   Array of path segments.
 * @return {Boolean} Returns true if object contains `path`.
 */
function hasPath(target, path) {
  path = pathToArray(path);

  const result = selectValues(target, path);

  return result.length === path.length;
}

/**
 * setByPath - Set deeply nested value into target object. If nested properties
 * are not an objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path Array of path segments.
 * @param {*} value Value to set.
 * @return {void}
 */
function setByPath(target, path, value) {
  if (! isObject(target)) {
    target = {};
  }

  path = pathToArray(path);

  const values = selectValues(target, path);

  return setValue(target, values, path, value);
}

/**
 * Push deeply nested value into target object. If nested properties are not an
 * objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path   Array of path segments.
 * @param {*} value Value to set.
 * @return {Object} Returns updated `target`.
 */
function pushByPath(target, path, value) {
  path = pathToArray(path);

  if (! path.length) {
    if (! Array.isArray(target)) {
      return [value];
    }
    else {
      target.push(value);
      return target;
    }
  }

  if (! isObject(target)) {
    target = {};
  }

  const values = selectValues(target, path);

  if (values.length < path.length || ! Array.isArray(values[values.length - 1])) {
    setValue(target, values, path, [value]);
  }
  else {
    values[values.length - 1].push(value);
  }

  return target;
}

/**
 * getByPath - Get value from `target` by `path`.
 *
 * @param  {*} target Nested object or anything else.
 * @param  {String|String[]} path Path to nested property.
 * @return {*} Returns value or undefined.
 */
function getByPath(target, path) {
  path = pathToArray(path);

  const values = selectValues(target, path);

  return values[values.length - 1];
}

/**
 * methodByPath - Receive method from deeply nested object as function with
 * captured context as the method's owner object.
 *
 * @param  {*} target Deeply nested object or anything else.
 * @param  {String|String[]} path Path to the method.
 * @return {Function} Returns function.
 */
function methodByPath(target, path) {
  path = pathToArray(path);

  const values = selectValues(target, path);

  if (values.length < path.length) {
    return noop;
  }

  if (typeof values[values.length - 1] !== 'function') {
    return noop;
  }

  if (values.length > 1) {
    return values[values.length - 1].bind(values[values.length - 2]);
  }
  else {
    return values[0].bind(target);
  }
}

/**
 * callByPath - Call method by it's path in nested object.
 *
 * @param  {*} target Nested object or anything else.
 * @param  {String|String[]} path Path to nested property.
 * @param  {*[]} args Arguments of function call.
 * @return {*} Result of function call or undefined if method not exists.
 */
function callByPath(target, path, args) {
  var fn = methodByPath(target, path);
  if (! fn) {
    return;
  }

  return fn.apply(null, args);
}

function getStructure(target, prefix) {
  if (! isObject(target)) {
    return [{path: [], value: target}];
  }

  if (! prefix) {
    prefix = [];
  }

  if (Array.isArray(target)) {
    return target.reduce(function (result, value, i) {
      if (isObject(value)) {
        return result.concat(getStructure(value, prefix.concat(i)));
      }
      else {
        result.push({
          path: prefix.concat(i),
          value: value,
        });
        return result;
      }
    }, []);
  }
  else {
    return Object.getOwnPropertyNames(target)
    .reduce(function(result, key) {
      const value = target[key];

      if (isObject(value)) {
        return result.concat(getStructure(value, prefix.concat(key)));
      }
      else {
        result.push({
          path: prefix.concat(key),
          value: value,
        });
        return result;
      }
    }, []);
  }
}

function isObject(target) {
  return target !== null && typeof target === 'object';
}

function noop() {}

function pathToArray(path) {
  if (typeof path === 'string') {
    if (path.length) {
      return path.split('.');
    }
    else {
      return [];
    }
  }
  else {
    return path;
  }
}