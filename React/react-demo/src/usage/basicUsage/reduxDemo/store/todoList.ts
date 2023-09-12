import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface TodoItem {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function getRandomId(len: number) : string{
    return Math.random().toString(36).substr(2, len);
}

const INIT_STATE: TodoItem[] = [
    {
        id: getRandomId(5),
        title: '吃饭',
        isCompleted: false
    }, 
    {
        id: getRandomId(5),
        title: '睡觉',
        isCompleted: false
    },
    {
        id: getRandomId(5),
        title: '打豆豆',
        isCompleted: false
    }
]


const todoListSlice = createSlice({
    name: "todoList",
    // state
    initialState: INIT_STATE,
    // actions
    reducers: {
        addTodoItem(state : TodoItem[], action : PayloadAction<TodoItem>) {
            return [
                action.payload,
                ...state
            ]
        },
        removeTodoItem(state : TodoItem[], action : PayloadAction<{id : string}>) {
            return state.filter(item => item.id !== action.payload.id)
        },
        toggleCompleted(state : TodoItem[], action : PayloadAction<{id : string}>) {
            return state.map(item => {
                if (item.id !== action.payload.id) return item;
                const preIsCompleted = item.isCompleted;
                return {
                    ...item,
                    isCompleted : !preIsCompleted,
                }

            })          
        }
    }
})

export const { addTodoItem, removeTodoItem, toggleCompleted } = todoListSlice.actions;

export default todoListSlice.reducer;