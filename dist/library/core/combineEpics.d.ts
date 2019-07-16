import { Epic, Action } from './common';
import ActionsObservable from './ActionsObservable';
import StateObservable from './StateObservable';
declare const _default: <T extends Action>(...epics: Epic<T, T, any, any>[]) => (action$: ActionsObservable<T>, state$: StateObservable<any>, dependencies?: any, ...args: any[]) => import("rxjs").Observable<T>;
/**
  Merges all epics into a single one.
 */
export default _default;
