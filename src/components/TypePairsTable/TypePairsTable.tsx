import { useEffect, useState } from "react";
import { TaskSettingsProvider } from "../TaskSettings";

import ResultSteps from "../ResultSteps";
import TypePairsForm, { TypePairsFormProps } from "@/components/TypePairsForm";

import { Alert, Col, Row } from "react-bootstrap";
import { createListWithNumbers } from "../utils";
import { ResultStep, ResultStepStatus } from "../ResultSteps/ResultSteps.types";
import TaskLayout from "@/components/Layout/TaskLayout";
import Spinner from "../Spinner/Spinner";

import { useTaskSettings } from "@/components/TaskSettings";

import TimerBar from "@/components/TimerBar";

export interface Task {
  fieldName: string;
  fieldValue: string;
  expectedResult: string;
}

export type Tasks = Task[];

export interface TypePairsTableProps {
  title: string;
  tasks: Task[];
  hasStartButton?: boolean;
  hasTimer?: boolean;
}

export const TableInner = (props: TypePairsTableProps) => {
  const { title, tasks, hasStartButton = false, hasTimer = false } = props;
  const { settings } = useTaskSettings();
  const [currentSettings, setCurrentSettings] = useState(settings);

  const updateStep = (step: ResultStep) => {
    const newSteps = [...steps];
    const stepIndex = newSteps.findIndex((s) => s.position === step.position);
    if (stepIndex !== -1) {
      newSteps[stepIndex] = step;
      setSteps(newSteps);
    }
  };

  const hasTimeLimit = hasTimer || settings.hasTimeLimit;
  const timeLimitSeconds = settings.timeLimitSeconds || 10;
  const timeLimitMs = timeLimitSeconds * 1000;
  const [timeLeftMs, setTimeLeftMs] = useState<number>(timeLimitMs);

  const [steps, setSteps] = useState<ResultStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStarted, setIsStarted] = useState(!hasStartButton);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentTask = tasks[currentStep - 1];

  const handleFormSubmit = (result: {
    status: ResultStepStatus;
    actualResult: string;
  }) => {
    const { status, actualResult } = result;
    const { fieldName, expectedResult } = currentTask;

    updateStep({
      position: currentStep,
      status,
      task: `${fieldName}`,
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
      setTimeLeftMs(timeLimitMs);
    }
  };

  const formProps: TypePairsFormProps = {
    ...currentTask,
    onSubmit: handleFormSubmit,
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

  useEffect(() => {
    if (!isStarted || isCompleted || !hasTimeLimit) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          //setIsCompleted(true);
          handleFormSubmit({ status: "timeout", actualResult: "" });
          return 0;
        } else {
          return prev - 100;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeftMs, hasTimeLimit, timeLimitMs]);

  useEffect(() => {
    if (
      settings.count !== currentSettings.count ||
      settings.hasTimeLimit !== currentSettings.hasTimeLimit ||
      settings.timeLimitSeconds !== currentSettings.timeLimitSeconds
    ) {
      window.location.reload();
    }
  }, [settings, currentSettings]);

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
          {/* Steps */}
          {isStarted && <ResultSteps steps={steps} currentStep={currentStep} />}

          {/* Timer */}
          {isStarted && hasTimeLimit && (
            <TimerBar timeLeftMs={timeLeftMs} totalTimeMs={timeLimitMs} />
          )}

          {/* Form */}
          {isStarted && !isCompleted && <TypePairsForm {...formProps} />}

          {/* Final results */}
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

export const TypePairsTable = (props: TypePairsTableProps) => (
  <TaskSettingsProvider>
    <TableInner {...props} />
  </TaskSettingsProvider>
);

export default TypePairsTable;
