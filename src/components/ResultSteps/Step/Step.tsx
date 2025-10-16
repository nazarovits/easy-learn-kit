import { useState } from "react";
import { ResultStep } from "../ResultSteps.types";
import styles from "./Step.module.css";
import { Alert, Modal } from "react-bootstrap";

interface StepProps extends ResultStep {
  isCurrent: boolean;
}

const TaskDescription = (props: StepProps) => {
  const { type } = props;

  if (type === "relations") {
    return <p>{props.task}</p>;
  }

  return (
    <p>
      {props.task} = <b>{props.expectedResult}</b>
    </p>
  );
};

const TaskExpectedResult = (props: StepProps) => {
  const { type } = props;
  const text = "A helyes megoldas:";

  if (type === "relations") {
    return (
      <p>
        {text} {props.expectedResult}
      </p>
    );
  }

  return (
    <p>
      {text} {props.expectedResult}
    </p>
  );
};

interface StatusInfo {
  className: string;
  title: string;
  alertVariant: "success" | "danger" | "warning" | "info";
}

const handleStatus = (status: string): StatusInfo | null => {
  if (status === "success") {
    return {
      className: styles.resultStepSuccess,
      title: "Gratulálok! :)",
      alertVariant: "success",
    };
  }

  if (status === "timeout") {
    return {
      className: styles.resultStepTimeout,
      title: "Nincs megfejtés :(",
      alertVariant: "danger",
    };
  }

  if (status === "failure") {
    return {
      className: styles.resultStepError,
      title: "Helytelen megfejtés :(",
      alertVariant: "danger",
    };
  }

  return null;
};

export const Step = (props: StepProps) => {
  const [show, setShow] = useState(false);
  const { status, position, isCurrent, actualResult } = props;

  const statusInfo = handleStatus(status) || {
    className: "",
    title: "",
    alertVariant: "info",
  };
  const { title, alertVariant } = statusInfo;
  let className = `${styles.resultStep} ${statusInfo.className}`;
  if (isCurrent) {
    className += ` ${styles.resultStepCurrent}`;
  }

  const onModalClose = () => setShow(false);
  const onClick = () => {
    if (status === "default") {
      return;
    }

    setShow(true);
  };

  const actualResultText =
    typeof actualResult === "number" && isNaN(actualResult)
      ? "Nincs válasz"
      : actualResult;

  return (
    <>
      <div className={className} onClick={onClick}>
        {position}
      </div>

      {show && (
        <Modal show={show} onHide={onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant={alertVariant}>
              <TaskDescription {...props} />
              <hr />
              <TaskExpectedResult {...props} />
              <p>A te megoldasod: {actualResultText}</p>
            </Alert>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
