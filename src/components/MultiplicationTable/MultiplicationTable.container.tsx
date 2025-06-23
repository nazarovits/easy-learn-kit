import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store";
import { start, end } from "./MultiplicationTable.slice";
import {
  setSteps,
  setCurrentStep,
  setStepsStatus,
  updateStep,
} from "../ResultSteps/ResultSteps.slice";
import MultiplicationTable from "./MultiplicationTable";

const mapStateToProps = (state: RootState) => ({
  isStarted: state.multiplicationTable.isStarted,
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
export default connector(MultiplicationTable);
