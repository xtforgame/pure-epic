"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rxjs = require("rxjs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default() {
  for (var _len = arguments.length, epics = new Array(_len), _key = 0; _key < _len; _key++) {
    epics[_key] = arguments[_key];
  }

  var merger = function merger(action$, state$, dependencies) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    return _rxjs.merge.apply(void 0, _toConsumableArray(epics.map(function (epic) {
      var output$ = epic.apply(void 0, [action$, state$, dependencies].concat(args));

      if (!output$) {
        throw new TypeError("combineEpics: one of the provided Epics \"".concat(epic.name || '<anonymous>', "\" does not return a stream. Double check you're not missing a return statement!"));
      }

      return output$;
    })));
  };

  try {
    Object.defineProperty(merger, 'name', {
      value: "combineEpics(".concat(epics.map(function (epic) {
        return epic.name || '<anonymous>';
      }).join(', '), ")")
    });
  } catch (e) {}

  return merger;
};

exports["default"] = _default;