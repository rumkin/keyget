'use strict';

module.exports.get = getByPath;
module.exports.set = setByPath;
module.exports.has = hasPath;
module.exports.push = pushByPath;
module.exports.method = methodByPath;
module.exports.call = callByPath;
module.exports.select = selectValues;

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

  var part;
  var result = [];
  var value = target;

  if (! isObject(value)) {
    return result;
  }

  for (var i = 0, l = path.length; i < l; i++) {
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
 * Set value into object with values map.
 *
 * @param {*} target Target value.
 * @param {*[]} values Array of values.
 * @param {string[]} path   Path to value.
 * @param {*} value  value to set into target.
 */
function setValue(target, values, path, value) {
  var value;

  if (! path.length) {
    return target;
  }

  for (var i = 0, l = path.length - 1; i < l; i++) {
    if (values.length < i) {
      target[path[i]] = {};
    } else if (! isObject(target[path[i]])) {
      target[path[i]] = {};
    }
    target = target[path[i]];
  }

  target[path[path.length - 1]] = value;
  return value;
}

/**
 * Set deeply nested value into target object. If nested properties are not an
 * objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path   Array of path segments.
 * @param {*} value Value to set.
 */
function hasPath(target, path) {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  var result = selectValues(target, path);

  return result.length === path.length;
}

/**
 * Set deeply nested value into target object. If nested properties are not an
 * objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path   Array of path segments.
 * @param {*} value Value to set.
 */
function setByPath(target, path, value) {

  if (! isObject(target)) {
    target = {};
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  var values = selectValues(target, path);

  return setValue(target, values, path, value);
}

/**
 * Push deeply nested value into target object. If nested properties are not an
 * objects or not exists creates them.
 *
 * @param {Object} target Parent object.
 * @param {Array} path   Array of path segments.
 * @param {*} value Value to set.
 */
function pushByPath(target, path, value) {
  if (! isObject(target)) {
    target = {};
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  var values = selectValues(target, path);

  if (values.length < path.length || ! Array.isArray(values[values.length - 1])) {
    target = setValue(target, values, path, []);
  } else {
    target = values[values.length - 1];
  }

  target.push(value);

  return target;
}

function getByPath(target, path) {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  var values = selectValues(target, path);

  return values[values.length - 1];
}

function methodByPath(target, path) {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  var values = selectValues(target, path);

  if (values.length < path.length) {
    return;
  }

  if (typeof values[values.length - 1] !== 'function') {
    return;
  }

  if (values.length > 1) {
    return values[values.length - 1].bind(values[values.length - 2]);
  } else {
    return values[0].bind(target);
  }
}

function callByPath(target, path, args) {
  var fn = methodByPath(target, path);
  if (! fn) {
    return;
  }

  return fn.apply(null, args);
}

function isObject(target) {
  return typeof target === 'object' && target !== null;
}
