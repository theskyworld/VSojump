import { FC, useReducer } from "react";

interface CountState {
    count: number
}

interface CountAction {
    type: string;
}

//  state初始值
const initialState: CountState = {
    count: 100,
}

// 判断action的类型，对state(不可变数据)进行操作，返回新的state
function reducer(state: CountState, action: CountAction) {
    switch (action.type) {
        case "increase":
            return {
                count: state.count + 1,
            };
        case "decrease":
            return {
                count: state.count - 1,
            }
        default:
            throw new Error("wrong action type");
    }
}

const CountReducer: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <p>count : {state.count}</p>
            <button onClick={() => dispatch({ type: "increase" })}>+</button>
            <button onClick={() => dispatch({ type: "decrease" })}>-</button>
        </>
    )
}

export default CountReducer;