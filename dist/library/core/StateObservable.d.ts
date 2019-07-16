import { Observable, Subject, Subscription } from 'rxjs';
export default class StateObservable<T> extends Observable<T> {
    value: T;
    __notifier: Subject<T>;
    __subscription: Subscription;
    constructor(stateSubject: Observable<any>, initialState: T);
}
