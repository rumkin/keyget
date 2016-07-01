'use strict';

const keyget = require('..');
const test = require('unit.js');

describe('keyget', () => {
  it('Should check if value exists', () => {
    var o = {
      a: {
        b: {
          c: 1
        },
      },
    };

    var result = keyget.has(o, 'a.b.c');

    test.bool(result).isTrue();
  });

  it('Should set value', () => {
    var obj = {};
    keyget.set(obj, 'a.b.c', 1);

    test.object(obj).hasProperty('a');
    test.object(obj.a).hasProperty('b');
    test.object(obj.a.b).hasProperty('c');
    test.number(obj.a.b.c).is(1);
  });

  it('Should push value', () => {
    var obj = {};
    keyget.push(obj, 'a.b.c', 1);

    test.object(obj).hasProperty('a');
    test.object(obj.a).hasProperty('b');
    test.object(obj.a.b).hasProperty('c');
    test.array(obj.a.b.c).is([1]);
  });

  it('Should get value', () => {
    var obj = {
      a: {
        b: 1
      }
    };

    var value = keyget.get(obj, 'a.b');

    test.number(value).is(1);
  });

  it('Should call by path', () => {
    var obj = {
      prop: {
        method() {
          return 1;
        }
      }
    };

    var result = keyget.call(obj, 'prop.method');

    test.number(result).is(1);
  });

  it('Should get method from object', () => {
    var o = {
      a: {
        b() {
          return this;
        },
        c: 100,
      },
    };

    var method = keyget.method(o, 'a.b');

    test.function(method);

    test.object(method()).is(o.a);
  });
});
