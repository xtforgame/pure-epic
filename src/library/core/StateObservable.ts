// from https://github.com/redux-observable/redux-observable
// bb69accab441459bdd8ae06ace9f18208027a947

import { Observable, Subject, Subscription } from 'rxjs';

export default class StateObservable<T> extends Observable<T> {
  value : T;
  __notifier : Subject<T>;
  __subscription : Subscription;

  constructor(stateSubject : Observable<any>, initialState : T) {
    super(subscriber => {
      const subscription = this.__notifier.subscribe(subscriber);
      if (subscription && !subscription.closed) {
        subscriber.next(this.value);
      }
      return subscription;
    });

    this.value = initialState;
    this.__notifier = new Subject<T>();
    this.__subscription = stateSubject.subscribe((value : T) => {
      // We only want to update state$ if it has actually changed since
      // redux requires reducers use immutability patterns.
      // This is basically what distinctUntilChanged() does but it's so simple
      // we don't need to pull that code in
      if (value !== this.value) {
        this.value = value;
        this.__notifier.next(value);
      }
    });
  }
}
