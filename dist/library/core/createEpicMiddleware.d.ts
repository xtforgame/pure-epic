import { Action, Epic, Store, Dependencies } from './common';
interface Options<DependenciesType = Dependencies> {
    dependencies?: DependenciesType;
}
declare const _default: <ActionType extends Action = Action, StateType extends any = any, StoreType extends Store<ActionType, StateType> = Store<ActionType, StateType>, DependenciesType = any>(options?: Options<DependenciesType>) => {
    (_store: StoreType): (next: Function) => (action: ActionType) => any;
    run(rootEpic: Epic<ActionType, ActionType, StateType, DependenciesType>): void;
};
export default _default;
