import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const RestartOrContinue = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Restart
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
