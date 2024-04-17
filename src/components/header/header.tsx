import { useState } from "react";
import Countdown from "react-countdown";
import { timeConverter } from "@/helpers/timeConverter";
import { Test } from "@/api";
import styles from "./header.module.css";

type Props = {
  test: Test;
  onComplete: () => void;
};

export const Header = ({ test, onComplete }: Props) => {
  const time = timeConverter(test.time);
  const [timeOnTimer, setTimeOnTimer] = useState(time);

  const onTick = () => {
    if (timeOnTimer > 0) {
      setTimeOnTimer((prev) => prev - 100);
      localStorage.setItem("time", JSON.stringify(timeOnTimer));
    }
  };

  const setActualTime = () => {
    const actualTime = localStorage.getItem("time");
    if (actualTime) setTimeOnTimer(JSON.parse(actualTime));
  };

  const onEnd = () => {
    setTimeOnTimer(0);
    localStorage.setItem("time", JSON.stringify(0));
    onComplete();
  };

  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.header}>{test.name}</h1>
      <Countdown
        date={Date.now() + timeOnTimer}
        daysInHours
        className={styles.counter}
        onComplete={onEnd}
        onTick={onTick}
        onMount={setActualTime}
        intervalDelay={100}
      />
    </div>
  );
};
