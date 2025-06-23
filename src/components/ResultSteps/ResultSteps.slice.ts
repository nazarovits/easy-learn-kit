import { createSlice } from '@reduxjs/toolkit'
import { ResultStep } from './ResultSteps.types';

interface ResultStepsState {
    currentStep: number;
    steps: ResultStep[]
}
const initialState: ResultStepsState = {
    currentStep: 1,
    steps: []
};

export const resultStepsSlice = createSlice({
    name: 'resultSteps',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setSteps: (state, action) => {
            const { steps } = action.payload;
            state.steps = steps;
        },
        setStepsStatus: (state, action) => {
            const { position, status } = action.payload;
            const stepIndex = state.steps.findIndex(step => step.position === position);
            const step = state.steps[stepIndex];
            if (step) {
                step.status = status;
            }   
        },
        updateStep: (state, action) => {
            const step = action.payload;
            const stepIndex = state.steps.findIndex(s => s.position === step.position);
            if (stepIndex !== -1) {
                state.steps[stepIndex] = step;
            }
            state.steps = [...state.steps]
        }
    },
});

export const { setCurrentStep, setSteps, setStepsStatus, updateStep } = resultStepsSlice.actions

export default resultStepsSlice.reducer