import { createSlice } from '@reduxjs/toolkit'

interface DivisionTableState {
    isStarted: boolean;
}

const initialState: DivisionTableState = {
    isStarted: false,
};

export const divisionTableSlice = createSlice({
    name: 'divisionTable',
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

export const { start, end } = divisionTableSlice.actions

export default divisionTableSlice.reducer