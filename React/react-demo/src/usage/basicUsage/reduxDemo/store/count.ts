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