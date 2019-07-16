import { Observable } from 'rxjs';
import ActionsObservable from './ActionsObservable';
import StateObservable from './StateObservable';
export interface Action {
    type: any;
}
export declare type State = any;
export interface Epic<Input extends Action = any, Output extends Input = Input, StateType = State, Dependencies = any> {
    (action$: ActionsObservable<Input>, state$: StateObservable<StateType>, dependencies?: Dependencies, ...args: any[]): Observable<Output>;
}
export interface Store<ActionType extends Action, StateType = State> {
    dispatch(action: ActionType): any;
    getState(): StateType;
}
export declare type Dependencies = any;
