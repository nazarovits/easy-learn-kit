import { useEffect, useRef, useState } from "react";

import ResultStepsContainer from "../../../components/ResultSteps";
import MultiplicationForm, {
  MultiplicationFormProps,
} from "../../../components/MultiplicationForm";
import { getRandomInteger } from "../../../components/utils/getRandomInteger";

import { PropsFromRedux } from "./MultiplicationPlay.container";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../../../components/utils";
import { ResultStep } from "../../../components/ResultSteps/ResultSteps.types";

import { useNavigate } from "react-router";
import { RoutePaths } from "../../../routes";
import { RestartOrContinue } from "../../../components/Modals/RestartOrContinue";

const taskCount = 10;

const createTasks = () => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(2, 9);
    const number2 = getRandomInteger(2, 9);
    const expectedResult = number1 * number2;

    return {
      number1,
      number2,
      expectedResult,
    };
  });

  return tasks;
};

export interface MultiplicationPlayProps {}

export const MultiplicationPlay = (
  props: MultiplicationPlayProps & PropsFromRedux
) => {
  const { isStarted, currentStep } = props;
  const tasks = useRef(createTasks()).current;
  const [isCompleted, setIsCompleted] = useState(false);
  const currentTask = tasks[currentStep - 1];
  const formProps: MultiplicationFormProps = {
    ...currentTask,

    onSubmit: ({ status, actualResult }) => {
      console.log("result status", status);
      console.log("result actual", actualResult);
      const { number1, number2, expectedResult } = currentTask;

      props.updateStep({
        position: currentStep,
        status,
        task: `${number1} x ${number2}`,
        actualResult,
        expectedResult,
      });

      if (currentStep === taskCount) {
        //setShowModal(true);
        setIsCompleted(true);
        //alert("Végeztél!");
        //window.location.reload();
      } else {
        props.setCurrentStep(currentStep + 1);
      }
    },
  };

  useEffect(() => {
    if (isStarted) {
      const items = createListWithNumbers(10);
      const steps: ResultStep[] = items.map((item) => ({
        status: "default",
        position: item,
      }));
      props.setSteps({ steps });
    }
  }, [isStarted]);

  useEffect(() => {
    if (!isStarted) {
      props.start();
      return;
    }

    window.onbeforeunload = () => {
      return "Biztosan el akarod hagyni a játékot?";
    };
  });

  return (
    <div className="container">
      {isStarted && (
        <div className="row mt-3">
          <div className="col">
            <Button
              type="submit"
              variant="secondary"
              className="btn"
              onClick={() => window.location.reload()}
            >
              Újrakezdés
            </Button>
          </div>
        </div>
      )}

      {isStarted && (
        <div className="row mt-5">
          <ResultStepsContainer />
        </div>
      )}

      {isStarted && !isCompleted && (
        <>
          <MultiplicationForm {...formProps} />
        </>
      )}

      {isCompleted && (
        <Row className="align-items-center justify-content-center mt-3">
          <Col className="col">
            <Alert variant="success">
              Sikeres:{" "}
              {props.steps.filter((step) => step.status === "success").length}
            </Alert>

            <Alert variant="danger">
              Hibas:{" "}
              {props.steps.filter((step) => step.status === "failure").length}
            </Alert>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MultiplicationPlay;
