// from https://github.com/redux-observable/redux-observable
// bb69accab441459bdd8ae06ace9f18208027a947

import { merge } from 'rxjs';
import { Epic, Action } from './common';
import ActionsObservable from './ActionsObservable';
import StateObservable from './StateObservable';

/**
  Merges all epics into a single one.
 */
export default <T extends Action>(...epics : Epic<T>[]) => {
  const merger = (
    action$ : ActionsObservable<T>,
    state$ : StateObservable<any>,
    dependencies?: any,
    ...args: any[]
  ) => merge(
    ...epics.map(epic => {
      const output$ = epic(action$, state$, dependencies, ...args);
      if (!output$) {
        throw new TypeError(`combineEpics: one of the provided Epics "${epic.name || '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`);
      }
      return output$;
    })
  );

  // Technically the `name` property on Function's are supposed to be read-only.
  // While some JS runtimes allow it anyway (so this is useful in debugging)
  // some actually throw an exception when you attempt to do so.
  try {
    Object.defineProperty(merger, 'name', {
      value: `combineEpics(${epics.map(epic => epic.name || '<anonymous>').join(', ')})`,
    });
  } catch (e) {}

  return merger;
};
