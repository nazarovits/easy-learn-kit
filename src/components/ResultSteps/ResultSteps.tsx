import { Row } from "react-bootstrap";
import styles from "./ResultSteps.module.css";
//import { PropsFromRedux } from "./ResultSteps.container";
//import StepContainer from "./Step/Step.container";
import { Step } from "./Step/Step";
import { ResultStep } from "./ResultSteps.types";

export interface ResultStepsProps {
  steps: ResultStep[];
  currentStep: number;
}

export const ResultSteps = (props: ResultStepsProps) => {
  const { steps = [], currentStep } = props;

  if (!steps.length) {
    return <Row className="justify-content-center">{"No results :("}</Row>;
  }

  return (
    <div className={styles.resultSteps}>
      {steps.map((step, index) => {
        return (
          <Step
            {...step}
            isCurrent={currentStep === step.position}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ResultSteps;
