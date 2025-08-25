import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Step } from "./Step";

const mapStateToProps = (state: RootState) => ({
  // TODO: do not use the airthmeticTable slice for the isStarted flag
  isStarted: state.arithmeticTable.isStarted,
  currentStep: state.resultSteps.currentStep,
});

const connector = connect(mapStateToProps, null);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Step);
