import { TodoItem } from './../../../reduxDemo/store/todoList';
import { getRandomId } from "../../../reduxDemo/store/todoList";


export interface TodoListItem {
    id?: string;
    title?: string;
    isCompleted?: boolean;
}

export type TodoListState = TodoItem[];

export interface TodoListAction {
    type: string;
    payload?: TodoListItem;
}

// state
export const initialState: TodoListState = [
        {
            id: getRandomId(5),
            title: "todo-1",
            isCompleted: false
        },
        {
            id: getRandomId(5),
            title: "todo-2",
            isCompleted: false
        },
        {
            id: getRandomId(5),
            title: "todo-3",
            isCompleted: false
        }
    ]


// actions
export function reducer(state: TodoListState, action: TodoListAction) {
    switch (action.type) {
        // addTodoItem
        case "addTodoItem":
            return (() => {
                const id = getRandomId(5);
                return state.concat(
                    {
                        id,
                        title: action.payload?.title || `todo-${id}`,
                        isCompleted: false
                    }
                );
            })();
        // deleteTodoItem
        case "deleteTodoItem":
            return state.filter(todo => todo.id !== action.payload?.id);
        // toggleIsCompleted
        case "toggleIsCompleted":
            return state.map(todo => {
                if (todo.id !== action.payload?.id) return todo;
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            })
        default:
            throw new Error("wrong action type");
    }
}