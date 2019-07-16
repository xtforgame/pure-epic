export { default as ActionsObservable } from './core/ActionsObservable';
export { default as StateObservable } from './core/StateObservable';
export { default as combineEpics } from './core/combineEpics';
export { default as createEpicMiddleware } from './core/createEpicMiddleware';

export * from './core/utils/console';
export * from './core/common';
export * from './core/StateObservable';
export * from './core/operators';

// import ActionsObservable from './core/ActionsObservable';
// import { ObservableInput } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { Action } from './core/common';
// export default function echo(data : any, err : any) {
//   return new Promise((resolve, reject) => {
//     if (err) {
//       return reject(err);
//     }
//     const output = [];
//     const action$ = ActionsObservable.of<Action>({ type: 'FIRST' }, { type: 'SECOND' });
//     action$.ofType('FIRST', 'SECOND')
//     .pipe(
//       mergeMap<Action, ObservableInput<Action>>((x) => {
//         return [x];
//       }),
//     )
//     .subscribe(x => {
//       output.push(x);
//       if (output.length > 1) {
//         resolve(data);
//       }
//     });
//   });
// }
