import { useEffect, useRef, useState } from "react";

import ResultStepsContainer from "../ResultSteps";
import MultiplicationForm, {
  MultiplicationFormProps,
} from "../MultiplicationForm";
import { getRandomInteger } from "../utils/getRandomInteger";

import { PropsFromRedux } from "./MultiplicationTable.container";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../utils";
import { ResultStep } from "../ResultSteps/ResultSteps.types";

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

export interface MultiplicationTableProps {}

export const MultiplicationTable = (
  props: MultiplicationTableProps & PropsFromRedux
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

  const onStartClick = () => {
    props.start();
  };

  return (
    <div className="container">
      <h2>Szorzótábla</h2>

      {!isStarted && (
        <div className="">
          <Button className="btn btn-success" onClick={onStartClick}>
            Kezdés
          </Button>
        </div>
      )}

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

export default MultiplicationTable;
