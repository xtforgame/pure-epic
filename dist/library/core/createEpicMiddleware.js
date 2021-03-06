"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _ActionsObservable = _interopRequireDefault(require("./ActionsObservable"));

var _StateObservable = _interopRequireDefault(require("./StateObservable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var QueueScheduler = _rxjs.queueScheduler.constructor;
  var uniqueQueueScheduler = new QueueScheduler(_rxjs.queueScheduler.SchedulerAction);

  if (process.env.NODE_ENV !== 'production' && typeof options === 'function') {
    throw new TypeError('Providing your root Epic to `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`\n\nLearn more: https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware');
  }

  var epic$ = new _rxjs.Subject();
  var store;

  var epicMiddleware = function epicMiddleware(_store) {
    if (process.env.NODE_ENV !== 'production' && store) {
      require("./utils/console").warn('this middleware is already associated with a store. createEpicMiddleware should be called for every store.\n\nLearn more: https://goo.gl/2GQ7Da');
    }

    store = _store;
    var actionSubject$ = new _rxjs.Subject();
    var actionObservable$ = actionSubject$.pipe((0, _operators.observeOn)(uniqueQueueScheduler));
    var stateSubject$ = new _rxjs.Subject();
    var stateObservable$ = stateSubject$.pipe((0, _operators.observeOn)(uniqueQueueScheduler));
    var action$ = new _ActionsObservable["default"](actionObservable$);
    var state$ = new _StateObservable["default"](stateObservable$, store.getState());
    var result$ = epic$.pipe((0, _operators.map)(function (epic) {
      var output$ = 'dependencies' in options ? epic(action$, state$, options.dependencies) : epic(action$, state$);

      if (!output$) {
        throw new TypeError("Your root Epic \"".concat(epic.name || '<anonymous>', "\" does not return a stream. Double check you're not missing a return statement!"));
      }

      return output$;
    }), (0, _operators.mergeMap)(function (output$) {
      return (0, _rxjs.from)(output$).pipe((0, _operators.subscribeOn)(uniqueQueueScheduler), (0, _operators.observeOn)(uniqueQueueScheduler));
    }));
    result$.subscribe(store.dispatch);
    return function (next) {
      return function (action) {
        var result = next(action);
        stateSubject$.next(store.getState());
        actionSubject$.next(action);
        return result;
      };
    };
  };

  epicMiddleware.run = function (rootEpic) {
    if (process.env.NODE_ENV !== 'production' && !store) {
      require("./utils/console").warn('epicMiddleware.run(rootEpic) called before the middleware has been setup by redux. Provide the epicMiddleware instance to createStore() first.');
    }

    epic$.next(rootEpic);
  };

  return epicMiddleware;
};

exports["default"] = _default;