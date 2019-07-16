// from https://github.com/redux-observable/redux-observable
// bb69accab441459bdd8ae06ace9f18208027a947

import { filter } from 'rxjs/operators';

const keyHasType = (type : any, key : any) => {
  return type === key || typeof key === 'function' && type === key.toString();
};
export const ofType = <T>(...keys : any[]) => (source : any) => source.pipe(
  filter<T>((value) => {
    const { type } = (<any>value);
    const len = keys.length;
    if (len === 1) {
      return keyHasType(type, keys[0]);
    } else {
      for (let i = 0; i < len; i++) {
        if (keyHasType(type, keys[i])) {
          return true;
        }
      }
    }
    return false;
  })
);
