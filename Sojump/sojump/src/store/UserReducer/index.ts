import { createSlice } from "@reduxjs/toolkit";

export type UserReducerState = {
  isLogined: boolean;
};

const initState: UserReducerState = {
  isLogined: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    changeIsLogined(state, action) {
      return {
        ...state,
        isLogined: action.payload,
      };
    },
  },
});

export const { changeIsLogined } = UserSlice.actions;
export default UserSlice.reducer;