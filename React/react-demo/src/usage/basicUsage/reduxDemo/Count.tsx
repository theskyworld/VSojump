import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "./store/count";
import { State } from "./store";

const Count: FC = () => {
    // 使用state
    const count = useSelector<State>(state => state.count);
    // 使用action
    const dispatch = useDispatch();

    return (
        <div>
            <span><>count : {count}</></span>
            <button onClick={() => dispatch(increase())}>+</button>
            <button onClick={() => dispatch(decrease())}>-</button>
        </div>
    )
}


export default Count;