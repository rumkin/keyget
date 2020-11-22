{
  "name": "keyget",
  "description": "Is nested object manipulation kit. It can find, get, set, push or call nested properties.",
  "version": "2.3.0-rc.2",
  "main": "index.js",
  "scripts": {
    "cov": "nyc npm run test",
    "cov:report": "nyc report --reporter=lcov --reporter=text",
    "test": "mocha test/**.spec.js",
    "lint": "eslint index.js test",
    "prepublishOnly": "npm run lint && npm run test"
  },
  "files": [
    "index.js",
    "license"
  ],
  "license": "MIT",
  "devDependencies": {
    "husky": "^1.3.0",
    "mocha": "^8.2.1",
    "should": "^13.2.3"
  },
  "bin": {
    "keyget": "cli.js"
  },
  "directories": {
    "test": "test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rumkin/keyget.git"
  },
  "keywords": [
    "key",
    "path",
    "object",
    "util",
    "keypath",
    "from-object"
  ],
  "author": "rumkin",
  "bugs": {
    "url": "https://github.com/rumkin/keyget/issues"
  },
  "homepage": "https://github.com/rumkin/keyget",
  "engine": {
    "node": ">= 6.0"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  },
  "dependencies": {
    "eslint": "^7.14.0",
    "nyc": "^15.1.0"
  }
}
