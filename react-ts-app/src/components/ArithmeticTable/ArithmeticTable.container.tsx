import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store";
import { start, end } from "./ArithmeticTable.slice";
import {
  setSteps,
  setCurrentStep,
  setStepsStatus,
  updateStep,
} from "../ResultSteps/ResultSteps.slice";
import Addition from "./ArithmeticTable";

const mapStateToProps = (state: RootState) => ({
  isStarted: state.arithmeticTable.isStarted,
  currentStep: state.resultSteps.currentStep,
  steps: state.resultSteps.steps,
});

const mapDispatchToProps = {
  start,
  end,
  setSteps,
  setCurrentStep,
  setStepsStatus,
  updateStep,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Addition);
