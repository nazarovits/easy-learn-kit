import { useState } from "react";
import {
  ToggleButton,
  Button,
  ButtonGroup,
  Container,
  Col,
  Row,
  Modal,
  FormControl,
} from "react-bootstrap";
import { useTaskSettings } from "../TaskSettings";
import IconButton from "@/ui/IconButton";

export interface TaskSettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const timerEnabledRadios = [
  { name: "On", value: "on" },
  { name: "Off", value: "off" },
];

export const TaskSettingsModal = (props: TaskSettingsModalProps) => {
  const { show, onHide } = props;
  const { settings, setSettings } = useTaskSettings();
  const [tempSettings, setTempSettings] = useState(settings);
  const [radioValue, setRadioValue] = useState(
    settings.hasTimeLimit ? "on" : "off"
  );

  const changeTimerSetting = (value: string) => {
    const hasTimeLimit = value === "on";
    setRadioValue(value);
    setTempSettings({
      ...tempSettings,
      hasTimeLimit,
    });
  };

  const onSaveClick = () => {
    setSettings(tempSettings);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Beállítások</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-2">
            <Col>Feladatok száma:</Col>
            <Col>{settings.count}</Col>
          </Row>
          <Row className="mb-2">
            <Col>Időkorlát:</Col>
            <Col>
              <ButtonGroup>
                {timerEnabledRadios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={
                      radioValue === radio.value ? "success" : "outline-success"
                    }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => changeTimerSetting(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>Timeout (sec):</Col>
            <Col>
              <FormControl
                disabled={!tempSettings.hasTimeLimit}
                type="number"
                step={5}
                value={tempSettings.timeLimitSeconds}
                onChange={(e) =>
                  setTempSettings({
                    ...tempSettings,
                    timeLimitSeconds: parseInt(e.target.value, 10),
                  })
                }
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <IconButton variant="primary" iconType="save" onClick={onSaveClick}>
          Mentés és bezárás
        </IconButton>
      </Modal.Footer>
    </Modal>
  );
};

TaskSettingsModal.dispalyName = "TaskSettingsModal";

export default TaskSettingsModal;
