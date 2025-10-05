import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";

import ResultSteps, { ResultStep } from "@/components/ResultSteps";
import ModTasksForm, { ModTasksFormProps } from "./ModTasksForm";

import { createListWithNumbers } from "@/components/utils";
import TaskLayout from "@/components/Layout/TaskLayout";
import Spinner from "@/components/Spinner/Spinner";

export enum Operation {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "x",
  Division = ":",
}

export interface Task {
  number1: number;
  number2: number;
  expectedResult: string;
  expectedCeil?: number;
  expectedMod?: number;
}

export interface ArithmeticTableProps {
  tasks: Task[];
}

export const ModTasks = (props: ArithmeticTableProps) => {
  const { tasks } = props;
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
  const [isCompleted, setIsCompleted] = useState(false);
  const currentTask = tasks[currentStep - 1];
  const formProps: ModTasksFormProps = {
    ...currentTask,

    onSubmit: ({ status, actualResult }) => {
      const { number1, number2, expectedResult } = currentTask;

      updateStep({
        position: currentStep,
        status,
        task: `${number1} : ${number2}`,
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
    const items = createListWithNumbers(10);
    const steps: ResultStep[] = items.map((item) => ({
      status: "default",
      position: item,
    }));
    setSteps(steps);
    setCurrentStep(1);
  }, []);

  return (
    <TaskLayout title={"Végezd el az osztást!"} isStarted={true}>
      {steps.length === 0 && (
        <Row className="mt-4 justify-content-center">
          <Spinner />
        </Row>
      )}

      {steps.length > 0 && (
        <Col className="mt-4">
          {<ResultSteps steps={steps} currentStep={currentStep} />}
          {!isCompleted && (
            <ModTasksForm {...formProps} operationSymbol={":"} />
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

export default ModTasks;
