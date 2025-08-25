import { useEffect, useState } from "react";

import ResultStepsContainer from "../ResultSteps";

// TODO: Rename this component
import MultiplicationForm, {
  MultiplicationFormProps,
} from "../MultiplicationForm";

import { PropsFromRedux } from "./ArithmeticTable.container";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../utils";
import { ResultStep } from "../ResultSteps/ResultSteps.types";

export enum Operation {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "x",
  Division = ":",
}

export interface Task {
  number1: number;
  number2: number;
  expectedResult: number;
}

export interface ArithmeticTableProps {
  title: string;
  operation: Operation;
  tasks: Task[];
}

export const ArithmeticTable = (
  props: ArithmeticTableProps & PropsFromRedux
) => {
  const { title, tasks, isStarted, currentStep, operation } = props;
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
        task: `${number1} + ${number2}`,
        actualResult,
        expectedResult,
      });

      if (currentStep === tasks.length) {
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
      <h2>{title}</h2>

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
          <MultiplicationForm {...formProps} operationSymbol={operation} />
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

export default ArithmeticTable;
