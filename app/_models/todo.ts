export enum TodoState {
    Active = 1,
    Cancelled = 2,
    Closed = 3
}
export interface Todo {
    id: number;
    state: TodoState;
    title: string;
    description: string;
}