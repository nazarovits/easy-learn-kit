import { createSlice } from '@reduxjs/toolkit'

interface MultiplicationTableState {
    isStarted: boolean;
}

const initialState: MultiplicationTableState = {
    isStarted: false,
};

export const multiplicationTableSlice = createSlice({
    name: 'multiplicationTable',
    initialState,
    reducers: {
        start: (state) => {
            state.isStarted = true;
        },
        end: (state) => {
            state.isStarted = false;
        }
    },
});

export const { start, end } = multiplicationTableSlice.actions

export default multiplicationTableSlice.reducer