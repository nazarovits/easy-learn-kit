import { configureStore } from "@reduxjs/toolkit";
//import { devToolsEnhancer  } from '@redux-devtools/extension';
import resultSteps from "./components/ResultSteps/ResultSteps.slice";
import arithmeticTable from "./components/ArithmeticTable/ArithmeticTable.slice";

const store = configureStore({
  reducer: {
    arithmeticTable,
    resultSteps,
  },
  preloadedState: {
    //multiplicationTable: { isStarted: true },
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
