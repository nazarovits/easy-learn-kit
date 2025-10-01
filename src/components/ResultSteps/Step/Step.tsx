import { useState } from "react";
import { ResultStep } from "../ResultSteps.types";
import styles from "./Step.module.css";
import { Alert, Modal } from "react-bootstrap";

interface StepProps extends ResultStep {
  isCurrent: boolean;
}

export const Step = (props: StepProps) => {
  const [show, setShow] = useState(false);
  const { status, position, isCurrent, actualResult } = props;
  let className = styles.resultStep;

  if (status === "success") {
    className += ` ${styles.resultStepSuccess}`;
  } else if (status === "failure") {
    className += ` ${styles.resultStepError}`;
  }

  if (isCurrent) {
    className += ` ${styles.resultStepCurrent}`;
  }

  const title =
    status === "success" ? "Gratulálok! :)" : "Helytelen megfejtés :(";
  const alertVariant = status === "success" ? "success" : "danger";

  const onModalClose = () => setShow(false);
  const onClick = () => {
    if (status === "default") {
      return;
    }

    setShow(true);
  };

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
              <p>
                {props.task} = <b>{props.expectedResult}</b>
              </p>
              <hr />
              <p>A helyes megoldas: {props.expectedResult}</p>
              <p>A te megoldasod: {actualResult}</p>
            </Alert>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
