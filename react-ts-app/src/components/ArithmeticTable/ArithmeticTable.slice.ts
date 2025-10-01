import { createSlice } from "@reduxjs/toolkit";

interface ArithmeticTableState {
  isStarted: boolean;
}

const initialState: ArithmeticTableState = {
  isStarted: false,
};

export const arithmeticTableSlice = createSlice({
  name: "arithmeticTable",
  initialState,
  reducers: {
    start: (state) => {
      state.isStarted = true;
    },
    end: (state) => {
      state.isStarted = false;
    },
  },
});

export const { start, end } = arithmeticTableSlice.actions;

export default arithmeticTableSlice.reducer;
