import { useEffect, useState } from "react";

import ResultStepsContainer from "../ResultSteps";
import ArithmeticTableForm, {
  ArithmeticTableFormProps,
} from "../ArithmeticTableForm";

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
  hasStartButton?: boolean;
}

export const ArithmeticTable = (
  props: ArithmeticTableProps & PropsFromRedux
) => {
  const {
    title,
    tasks,
    steps,
    currentStep,
    operation,
    hasStartButton = false,

    updateStep,
    setCurrentStep,
    setSteps,
  } = props;
  const [isStarted, setIsStarted] = useState(!hasStartButton);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentTask = tasks[currentStep - 1];
  const formProps: ArithmeticTableFormProps = {
    ...currentTask,

    onSubmit: ({ status, actualResult }) => {
      console.log("result status", status);
      console.log("result actual", actualResult);
      const { number1, number2, expectedResult } = currentTask;

      updateStep({
        position: currentStep,
        status,
        task: `${number1} ${operation} ${number2}`,
        actualResult,
        expectedResult,
      });

      if (currentStep === tasks.length) {
        //setShowModal(true);
        setIsCompleted(true);
        //alert("Végeztél!");
        //window.location.reload();
      } else {
        setCurrentStep(currentStep + 1);
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
      setSteps({ steps });
      setCurrentStep(1);
    }
  }, [isStarted]);

  const onStartClick = () => {
    setIsStarted(true);
  };

  return (
    <div className="container">
      <h2>{title}</h2>

      {hasStartButton && !isStarted && (
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
          <ArithmeticTableForm {...formProps} operationSymbol={operation} />
        </>
      )}

      {isCompleted && (
        <Row className="align-items-center justify-content-center mt-3">
          <Col className="col">
            <Alert variant="success">
              Sikeres:{" "}
              {steps.filter((step) => step.status === "success").length}
            </Alert>

            <Alert variant="danger">
              Hibas: {steps.filter((step) => step.status === "failure").length}
            </Alert>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ArithmeticTable;
