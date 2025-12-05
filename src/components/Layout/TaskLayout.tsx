import { PropsWithChildren, useEffect, useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import IconButton from "@/ui/IconButton";
import { TaskSettingsModal } from "@/components/TaskSettings";

interface TaskLayoutProps {
  title: string;
  isStarted: boolean;
  onStartClick?: () => void;
  hasStartButton?: boolean;
}
export const TaskLayout = (props: PropsWithChildren<TaskLayoutProps>) => {
  const {
    title,
    children,
    isStarted = false,
    onStartClick = () => {},
    hasStartButton = true,
  } = props;
  const [showModal, setShowModal] = useState(false);

  const onReloadClick = () => {
    window.location.reload();
  };

  const onSettingsClick = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Col>
        <Row className="mt-4">
          <h2 className="text-center">{title}</h2>
        </Row>

        <Row>
          <Col className="text-center">
            {hasStartButton && !isStarted && (
              <Button variant="success" onClick={onStartClick}>
                Kezdés
              </Button>
            )}
            {isStarted && (
              <Row className="mt-2 justify-content-center gap-2">
                <IconButton
                  iconType="refresh"
                  aria-label="Újrakezdés"
                  variant="outline-success"
                  onClick={onReloadClick}
                />
                <IconButton
                  iconType="settings"
                  aria-label="Beállítások"
                  variant="outline-secondary"
                  onClick={onSettingsClick}
                />
              </Row>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">{children}</Row>
      </Col>
      <TaskSettingsModal show={showModal} onHide={() => setShowModal(false)} />
    </Container>
  );
};

TaskLayout.dispalyName = "TaskLayout";

export default TaskLayout;
