import { useEffect, useState } from "react";

import ResultSteps from "../ResultSteps";
import ArithmeticTableForm, {
  ArithmeticTableFormProps,
} from "../ArithmeticTableForm";

import { Alert, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../utils";
import { ResultStep } from "../ResultSteps/ResultSteps.types";
import TaskLayout from "@/components/Layout/TaskLayout";
import Spinner from "../Spinner/Spinner";

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

export type Tasks = Task[];

export interface ArithmeticTableProps {
  title: string;
  operation: Operation;
  tasks: Task[];
  hasStartButton?: boolean;
}

export const ArithmeticTable = (props: ArithmeticTableProps) => {
  const { title, tasks, operation, hasStartButton = false } = props;
  const updateStep = (step: ResultStep) => {
    const newSteps = [...steps];
    const stepIndex = newSteps.findIndex((s) => s.position === step.position);
    if (stepIndex !== -1) {
      newSteps[stepIndex] = step;
      setSteps(newSteps);
    }
  };

  const [steps, setSteps] = useState<ResultStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStarted, setIsStarted] = useState(!hasStartButton);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentTask = tasks[currentStep - 1];
  const formProps: ArithmeticTableFormProps = {
    ...currentTask,

    onSubmit: ({ status, actualResult }) => {
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
    if (!isStarted) {
      return;
    }

    const items = createListWithNumbers(10);
    const steps: ResultStep[] = items.map((item) => ({
      status: "default",
      position: item,
    }));
    setSteps(steps);
    setCurrentStep(1);
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
      {steps.length === 0 && (
        <Row className="mt-4 justify-content-center">
          <Spinner />
        </Row>
      )}

      {steps.length > 0 && (
        <Col className="mt-4">
          {isStarted && <ResultSteps steps={steps} currentStep={currentStep} />}
          {isStarted && !isCompleted && (
            <ArithmeticTableForm {...formProps} operationSymbol={operation} />
          )}

          {isCompleted && (
            <Row className="align-items-center justify-content-center mt-4">
              <Col className="col">
                <Alert variant="success">
                  Sikeres:{" "}
                  {steps.filter((step) => step.status === "success").length}
                </Alert>

                <Alert variant="danger">
                  Hibas:{" "}
                  {steps.filter((step) => step.status === "failure").length}
                </Alert>
              </Col>
            </Row>
          )}
        </Col>
      )}
    </TaskLayout>
  );
};

export default ArithmeticTable;
