import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Step } from "./Step";

const mapStateToProps = (state: RootState) => ({
  isStarted: state.multiplicationTable.isStarted,
  currentStep: state.resultSteps.currentStep,
});

const connector = connect(mapStateToProps, null);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Step);
