# 使用[Redux](https://redux.js.org/)

## 基本使用

##### 安装

```shell
npm install @reduxjs/toolkit react-redux
```

##### 创建根state

```ts
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./count";
 
export interface State {
    count: number;
}

export default configureStore({
    reducer: {
        count : countReducer,
    }
})
```

##### 创建state模块

```ts
// store/count.ts
import { createSlice } from "@reduxjs/toolkit";


const INIT_STATE = 100;

// 创建count模块
const countSlice = createSlice({
    name: "count",
    // state
    initialState: INIT_STATE,
    // actions
    reducers: {
        increase(state: number) {
            return state + 1;
        },
        decrease(state: number) {
            return state - 1;
        }
    }
})


export const { increase, decrease } = countSlice.actions;

export default countSlice.reducer;
```

##### 根组件中的配置

```tsx
// index.tsx
import App from "./usage/basicUsage/reduxDemo/Count";
import store from "./usage/basicUsage/reduxDemo/store"; 
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

##### 在组件中进行使用

```tsx
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
```
