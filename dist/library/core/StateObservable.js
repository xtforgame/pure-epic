"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rxjs = require("rxjs");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StateObservable = function (_Observable) {
  _inherits(StateObservable, _Observable);

  function StateObservable(stateSubject, initialState) {
    var _this;

    _classCallCheck(this, StateObservable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StateObservable).call(this, function (subscriber) {
      var subscription = _this.__notifier.subscribe(subscriber);

      if (subscription && !subscription.closed) {
        subscriber.next(_this.value);
      }

      return subscription;
    }));

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _defineProperty(_assertThisInitialized(_this), "__notifier", void 0);

    _defineProperty(_assertThisInitialized(_this), "__subscription", void 0);

    _this.value = initialState;
    _this.__notifier = new _rxjs.Subject();
    _this.__subscription = stateSubject.subscribe(function (value) {
      if (value !== _this.value) {
        _this.value = value;

        _this.__notifier.next(value);
      }
    });
    return _this;
  }

  return StateObservable;
}(_rxjs.Observable);

exports["default"] = StateObservable;