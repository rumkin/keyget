'use strict';

const keyget = require('..');
const test = require('unit.js');

describe('keyget', () => {
  describe('Select values', () => {
    it('Select "a" from {a: 1}', () => {
      let result = keyget.select({a: 1}, ['a']);

      test.number(result[0]).is(1);
    });

    it('Should select part of path', () => {
      let result = keyget.select({a: {b: 2}}, ['a', 'b', 'c']);

      test.array(result).is([{b: 2}, 2]);
    });

    it('Should return empty array on mismatch', () => {
      let result = keyget.select({b: 1}, ['a', 'b', 'c']);


      test.array(result).is([]);
    });

    it('Should return empty array from null', () => {
      let result = keyget.select(null, ['a', 'b', 'c']);


      test.array(result).is([]);
    });

    it('Should return empty array from number', () => {
      let result = keyget.select(1, ['a', 'b', 'c']);


      test.array(result).is([]);
    });

    it('Should return empty array from undefined', () => {
      let result = keyget.select(undefined, ['a', 'b', 'c']);


      test.array(result).is([]);
    });
  });

  describe('utils', () => {
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

    it('Should push value into existing array', () => {
      var obj = {a: {b: [1]}};
      keyget.push(obj, 'a.b', 2);

      test.object(obj).hasProperty('a');
      test.object(obj.a).hasProperty('b');
      test.array(obj.a.b).is([1, 2]);
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

    it('Should get value', () => {
      var obj = {
        a: {
          b: 1
        }
      };

      var value = keyget.get(obj, '');

      test.undefined(value);
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
});
