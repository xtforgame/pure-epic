// from https://github.com/redux-observable/redux-observable
// bb69accab441459bdd8ae06ace9f18208027a947

import { Observable, Operator, ObservableInput, of, from } from 'rxjs';
import { ofType } from './operators';

export default class ActionsObservable<T> extends Observable<T> {
  static of<T>(...actions : any) {
    return new this<T>(of(...actions));
  }

  static from<T extends ObservableInput<any>>(actions : any, scheduler : any) {
    return new this(from<T>(actions, scheduler));
  }

  constructor(input$: Observable<T>) {
    super();
    this.source = input$;
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable : Observable<R> = <any>new ActionsObservable<R>(<any>this);
    observable.operator = operator;
    return observable;
  }

  ofType(...keys: any[]): ActionsObservable<T> {
    return ofType<T>(...keys)(this);
  }
}
