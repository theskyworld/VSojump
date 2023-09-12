import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./count";
import todoListReducer, { TodoItem } from "./todoList";
 
export interface State {
    count: number;
    todoList: TodoItem[];
}

export default configureStore({
    reducer: {
        count: countReducer,
        todoList: todoListReducer
    }
})