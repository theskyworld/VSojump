import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import Test from "../useReducerDemo/todoListReducer/Test";
import { State } from "./store/index";
import { getRandomId, TodoItem } from "./store/todoList";
import { removeTodoItem, toggleCompleted, addTodoItem } from "./store/todoList";

const TodoList: FC = () => {
    // 获取state
    const todoList: TodoItem[] = useSelector<State>(state => state.todoList) as TodoItem[];
    const dispatch = useDispatch();

    function deleteTodo(id: string) {
        dispatch(removeTodoItem({ id }));
    }

    function toggleIsCompleted(id: string) {
        dispatch(toggleCompleted({ id }));
    }

    function addTodo() {
        const id = getRandomId(5);
        const newTodo: TodoItem = {
            id,
            title: `todo-${id}`,
            isCompleted: false,
        }
        dispatch(addTodoItem(newTodo));
    }
    return (
        <>
            <h3>todoList</h3>
            <div>
                <button onClick={addTodo}>添加</button>
                <ul>
                    {
                        todoList.map(todo => {
                            const { id, title, isCompleted } = todo;
                            return <li key={id} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                <span onClick={() => { toggleIsCompleted(id) }}>{title}</span>
                                &nbsp;
                                <button onClick={() => { deleteTodo(id) }}>删除</button>
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

export default TodoList;