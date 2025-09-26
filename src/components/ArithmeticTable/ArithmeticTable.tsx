import { useEffect, useState } from "react";

import ResultStepsContainer from "../ResultSteps";
import ArithmeticTableForm, {
  ArithmeticTableFormProps,
} from "../ArithmeticTableForm";

import { PropsFromRedux } from "./ArithmeticTable.container";
import { Alert, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../utils";
import { ResultStep } from "../ResultSteps/ResultSteps.types";
import TaskLayout from "../../layout/task";

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
    <TaskLayout
      title={title}
      isStarted={isStarted}
      onStartClick={onStartClick}
      hasStartButton={hasStartButton}
    >
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
    </TaskLayout>
  );
};

export default ArithmeticTable;
