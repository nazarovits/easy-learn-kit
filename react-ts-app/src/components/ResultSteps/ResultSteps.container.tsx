import ResultSteps from './ResultSteps';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentStep, setSteps, setStepsStatus } from './ResultSteps.slice';

const mapStateToProps = (state: RootState) => ({
  steps: state.resultSteps.steps,
  currentStep: state.resultSteps.currentStep,
});

const mapDispatchToProps = {
    setSteps,
    setCurrentStep,
    setStepsStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ResultSteps);