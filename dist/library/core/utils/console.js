"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = exports.deprecate = exports.resetDeprecationsSeen = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var deprecationsSeen = {};

var resetDeprecationsSeen = function resetDeprecationsSeen() {
  deprecationsSeen = {};
};

exports.resetDeprecationsSeen = resetDeprecationsSeen;
var consoleWarn = (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && typeof console.warn === 'function' ? function () {
  var _console;

  return (_console = console).warn.apply(_console, arguments);
} : function () {};

var deprecate = function deprecate(msg) {
  if (!deprecationsSeen[msg]) {
    deprecationsSeen[msg] = true;
    consoleWarn("redux-observable | DEPRECATION: ".concat(msg));
  }
};

exports.deprecate = deprecate;

var warn = function warn(msg) {
  consoleWarn("redux-observable | WARNING: ".concat(msg));
};

exports.warn = warn;