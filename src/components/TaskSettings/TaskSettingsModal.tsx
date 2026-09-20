import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
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
import {
  TaskSettings,
  MultiplicationTableNumbers,
  useTaskSettings,
} from "../TaskSettings";
import IconButton from "@/ui/IconButton";

export interface TaskSettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const boolRadios = [
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

  const multiplicationTableSettings = tempSettings.multiplicationTable;
  const [multiplicationNumbers, setMultiplicationNumbers] = useState<
    Record<string, "on" | "off">
  >({
    0: multiplicationTableSettings?.enabledNumbers[0] ? "on" : "off",
    1: multiplicationTableSettings?.enabledNumbers[1] ? "on" : "off",
    2: multiplicationTableSettings?.enabledNumbers[2] ? "on" : "off",
    3: multiplicationTableSettings?.enabledNumbers[3] ? "on" : "off",
    4: multiplicationTableSettings?.enabledNumbers[4] ? "on" : "off",
    5: multiplicationTableSettings?.enabledNumbers[5] ? "on" : "off",
    6: multiplicationTableSettings?.enabledNumbers[6] ? "on" : "off",
    7: multiplicationTableSettings?.enabledNumbers[7] ? "on" : "off",
    8: multiplicationTableSettings?.enabledNumbers[8] ? "on" : "off",
    9: multiplicationTableSettings?.enabledNumbers[9] ? "on" : "off",
    10: multiplicationTableSettings?.enabledNumbers[10] ? "on" : "off",
  });

  const changeTimerSetting = (value: string) => {
    const hasTimeLimit = value === "on";
    setRadioValue(value);
    setTempSettings({
      ...tempSettings,
      hasTimeLimit,
    });
  };

  const changeMultiplicationNumberSetting = (number: number, value: string) => {
    setMultiplicationNumbers({
      ...multiplicationNumbers,
      [number]: value,
    });
  };

  const onSaveClick = () => {
    setSettings({
      ...tempSettings,
      multiplicationTable: {
        enabledNumbers: Object.keys(multiplicationNumbers).reduce(
          (acc, curr) => {
            acc[Number(curr) as keyof MultiplicationTableNumbers] =
              multiplicationNumbers[curr] === "on";
            return acc;
          },
          {} as MultiplicationTableNumbers
        ),
      },
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Beállítások</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Speciális beállítások</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-2">
                  <Col>Feladatok száma:</Col>
                  <Col>{settings.count}</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Időkorlát:</Col>
                  <Col>
                    <ButtonGroup>
                      {boolRadios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={
                            radioValue === radio.value
                              ? "success"
                              : "outline-success"
                          }
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) =>
                            changeTimerSetting(e.currentTarget.value)
                          }
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Szorzás</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Row className="mb-2 align-items-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      return (
                        <Col key={num} className="mt-2">
                          {num} -{" "}
                          <ButtonGroup key={num}>
                            {boolRadios.map((radio, idx) => (
                              <ToggleButton
                                key={idx}
                                id={`radio-${idx}-${num}`}
                                type="radio"
                                variant={
                                  multiplicationNumbers[num] === radio.value
                                    ? "success"
                                    : "outline-success"
                                }
                                name={`radio-${num}`}
                                value={radio.value}
                                checked={
                                  multiplicationNumbers[num] === radio.value
                                }
                                onChange={(e) =>
                                  changeMultiplicationNumberSetting(
                                    num,
                                    e.currentTarget.value
                                  )
                                }
                              >
                                {radio.name}
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </Col>
                      );
                    })}
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
