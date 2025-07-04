import { configureStore } from '@reduxjs/toolkit';
//import { devToolsEnhancer  } from '@redux-devtools/extension';
import multiplicationTable from './components/MultiplicationTable/MultiplicationTable.slice'
import divisionTable from './components/DivisionTable/DivisionTable.slice';
import resultSteps from './components/ResultSteps/ResultSteps.slice'

const store = configureStore({
  reducer: {
    multiplicationTable,
    divisionTable,
    resultSteps,
  },
  preloadedState: {
    //multiplicationTable: { isStarted: true },
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
