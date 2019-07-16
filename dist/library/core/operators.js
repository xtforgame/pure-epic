"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ofType = void 0;

var _operators = require("rxjs/operators");

var keyHasType = function keyHasType(type, key) {
  return type === key || typeof key === 'function' && type === key.toString();
};

var ofType = function ofType() {
  for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  return function (source) {
    return source.pipe((0, _operators.filter)(function (value) {
      var _ref = value,
          type = _ref.type;
      var len = keys.length;

      if (len === 1) {
        return keyHasType(type, keys[0]);
      } else {
        for (var i = 0; i < len; i++) {
          if (keyHasType(type, keys[i])) {
            return true;
          }
        }
      }

      return false;
    }));
  };
};

exports.ofType = ofType;