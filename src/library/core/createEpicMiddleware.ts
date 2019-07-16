import { Subject, Observable, ObservableInput, from, queueScheduler } from 'rxjs';
import {
  map,
  mergeMap,
  observeOn,
  subscribeOn,
} from 'rxjs/operators';
import ActionsObservable from './ActionsObservable';
import StateObservable from './StateObservable';
import { Action, Epic, State, Store, Dependencies } from './common';

interface Options<DependenciesType = Dependencies> {
  dependencies?: DependenciesType;
}

export default <
  ActionType extends Action = Action,
  StateType extends State = State,
  StoreType extends Store<ActionType, StateType> = Store<ActionType, StateType>,
  DependenciesType = Dependencies,
>(options : Options<DependenciesType> = {}) => {
  // This isn't great. RxJS doesn't publicly export the constructor for
  // QueueScheduler nor QueueAction, so we reach in. We need to do this because
  // we don't want our internal queuing mechanism to be on the same queue as any
  // other RxJS code outside of redux-observable internals.
  const QueueScheduler : any = queueScheduler.constructor;
  const uniqueQueueScheduler = new QueueScheduler((<any>queueScheduler).SchedulerAction);

  if (process.env.NODE_ENV !== 'production' && typeof options === 'function') {
    throw new TypeError('Providing your root Epic to `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`\n\nLearn more: https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware');
  }

  const epic$ = new Subject<Epic<ActionType, ActionType, StateType, DependenciesType>>();
  let store : StoreType;

  const epicMiddleware = (_store : StoreType) => {
    if (process.env.NODE_ENV !== 'production' && store) {
      // https://github.com/redux-observable/redux-observable/issues/389
      require('./utils/console').warn('this middleware is already associated with a store. createEpicMiddleware should be called for every store.\n\nLearn more: https://goo.gl/2GQ7Da'); // eslint-disable-line global-require
    }
    store = _store;
    const actionSubject$ = new Subject<ActionType>();
    const actionObservable$ = actionSubject$.pipe(
      observeOn<ActionType>(uniqueQueueScheduler)
    );
    const stateSubject$ = new Subject<State>();
    const stateObservable$ = stateSubject$.pipe(
      observeOn<State>(uniqueQueueScheduler)
    );
    const action$ = new ActionsObservable<ActionType>(actionObservable$);
    const state$ = new StateObservable<StateType>(stateObservable$, store.getState());

    const result$ = epic$.pipe(
      map(
        (epic) => {
        const output$ = 'dependencies' in options
          ? epic(action$, state$, options.dependencies)
          : epic(action$, state$);

        if (!output$) {
          throw new TypeError(`Your root Epic "${epic.name || '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`);
        }

        return output$;
      }),
      mergeMap<Observable<ActionType>, ObservableInput<ActionType>>(
        output$ => from(output$).pipe(
          subscribeOn(uniqueQueueScheduler),
          observeOn(uniqueQueueScheduler)
        )
      )
    );

    result$.subscribe(store.dispatch);

    return (next : Function) => {
      return (action : ActionType) => {
        // Downstream middleware gets the action first,
        // which includes their reducers, so state is
        // updated before epics receive the action
        const result = next(action);

        // It's important to update the state$ before we emit
        // the action because otherwise it would be stale
        stateSubject$.next(store.getState());
        actionSubject$.next(action);

        return result;
      };
    };
  };

  epicMiddleware.run = (rootEpic : Epic<ActionType, ActionType, StateType, DependenciesType>) => {
    if (process.env.NODE_ENV !== 'production' && !store) {
      require('./utils/console').warn('epicMiddleware.run(rootEpic) called before the middleware has been setup by redux. Provide the epicMiddleware instance to createStore() first.'); // eslint-disable-line global-require
    }
    epic$.next(rootEpic);
  };

  return epicMiddleware;
}
