import { Observable, Operator, ObservableInput } from 'rxjs';
export default class ActionsObservable<T> extends Observable<T> {
    static of<T>(...actions: any): ActionsObservable<T>;
    static from<T extends ObservableInput<any>>(actions: any, scheduler: any): ActionsObservable<import("rxjs").ObservedValueOf<T>>;
    constructor(input$: Observable<T>);
    lift<R>(operator: Operator<T, R>): Observable<R>;
    ofType(...keys: any[]): ActionsObservable<T>;
}
