/**
 * @description 用于测试useReducer和redux在state管理方面的区别
 */
import { FC, useReducer } from "react";
import { initialState, reducer } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../reduxDemo/store/index"
import { getRandomId, TodoItem } from "../../reduxDemo/store/todoList";
import { removeTodoItem, toggleCompleted, addTodoItem } from "../../reduxDemo/store/todoList";

const Test: FC = () => {
    // useReducer
    const [state] = useReducer(reducer, initialState);
    // redux
    const todoList: TodoItem[] = useSelector<State>(state => state.todoList) as TodoItem[];
    return (
        <>
            {/* useReducer，在 useReduerDemo/todoListReducer/TodoListReducer.tsx 中引入后使用*/}
            {/* <div>
                <ul>
                    {
                        state.map(todo => {
                            const { id, title, isCompleted } = todo;
                            return <li key={id}>
                                <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</span>
                                <button >删除</button>
                            </li>
                        })
                    }
                </ul>
            </div> */}
            {/* redux，在 reduxDemo/TodoList.tsx 中引入后使用 */}
            <div>
                <ul>
                    {
                        todoList.map(todo => {
                            const { id, title, isCompleted } = todo;
                            return <li key={id}>
                                <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</span>
                                <button >删除</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Test;