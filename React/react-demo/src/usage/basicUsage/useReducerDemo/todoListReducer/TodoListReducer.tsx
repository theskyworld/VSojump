import { ChangeEvent, FC, useReducer, useState } from "react";
import { initialState, reducer } from "./store";
import Test from "./Test";


const TodoListReducer: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    return (
        <>
            <h3>TodoList</h3>
            <input placeholder="add new todo..." type="text" value={newTodoTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewTodoTitle(e.target.value) }} />
            <button onClick={() => dispatch({ type: "addTodoItem", payload: { title: newTodoTitle } })}>添加</button>
            <div>
                <ul>
                    {
                        state.map(todo => {
                            const { id, title, isCompleted } = todo;
                            return <li key={id}>
                                <span onClick={() => dispatch({ type: "toggleIsCompleted", payload : {id}})} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</span>
                                <button onClick={() => dispatch({ type: "deleteTodoItem", payload : {id}})}>删除</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* 用于测试useReducer和redux在state管理方面的区别 */}
            {/* <div>
                <Test></Test>
            </div> */}
        </>
    )
}


export default TodoListReducer;