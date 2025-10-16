import styles from "./TimerBar.module.css";
import { Row, Col } from "react-bootstrap";

import Train from "@/illustrations/train";

export interface TimerBarProps {
  timeLeftMs: number;
  totalTimeMs: number;
}

enum Status {
  Normal = "normal",
  Warning = "warning",
  Danger = "danger",
}
const colors: Record<Status, string> = {
  [Status.Normal]: "#4caf50", // Green
  [Status.Warning]: "#ff9800", // Orange
  [Status.Danger]: "#f44336", // Red
};

export const TimerBar = (props: TimerBarProps) => {
  const { timeLeftMs, totalTimeMs } = props;
  const status =
    timeLeftMs > totalTimeMs * 0.5
      ? Status.Normal
      : timeLeftMs > totalTimeMs * 0.2
      ? Status.Warning
      : Status.Danger;

  const color = colors[status];
  const positionPercentage = Math.max(
    0,
    Math.min(100, (timeLeftMs / totalTimeMs) * 100)
  );

  const timeLeftSeconds = Math.ceil(timeLeftMs / 1000);

  return (
    <Row className={`mt-4 ${styles.timerBarContainer}`}>
      <Col>
        <div className={`${styles.timerBarBackground}`}>
          <div
            className={styles.timerBarFill}
            style={{ left: `${100 - positionPercentage}%` }}
          >
            <Train color={color} />
          </div>
        </div>
        <div className="text-center" style={{ color }}>
          {timeLeftSeconds}
        </div>
      </Col>
    </Row>
  );
};
