# CHANGELOG

### v2.3

* Fix security vulnerabilities:
  * Prototype pollution in methods `set`, `push` and `at`.
* Fix inconsistency in method `method` when calling on function as a target.
  Previousely it was bind to itself, now to null.

### v2.1

* Add `breadcrumbs` method.

### v2.0

Refactored and reviewed 1.0 version. Has some breaking changes:

* Path could be empty array or string. This will be interpreted as path
  to target itself.
* Update methods always return target.

### v1.0

Initial version.

* Add methods:
    * set
    * get
    * has
    * call
    * method
