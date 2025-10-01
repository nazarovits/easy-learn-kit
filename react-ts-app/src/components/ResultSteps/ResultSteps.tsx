import styles from "./ResultSteps.module.css";
import { PropsFromRedux } from "./ResultSteps.container";
import StepContainer from "./Step/Step.container";

export const ResultSteps = (props: PropsFromRedux) => {
  const { steps = [], currentStep } = props;

  return (
    <div className="container">
      {!steps.length && <>No results :(...</>}

      {steps.length > 0 && (
        <div className={styles.resultSteps}>
          {steps.map((step, index) => {
            return (
              <StepContainer
                {...step}
                isCurrent={currentStep === step.position}
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultSteps;
