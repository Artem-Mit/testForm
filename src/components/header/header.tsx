import Countdown from "react-countdown";
import { timeConverter } from "@/helpers/timeConverter";
import { Test } from "@/api";
import styles from './header.module.css';

type Props = {
  test: Test;
  onComplete: () => void;
};

export const Header = ({ test, onComplete }: Props) => {
  const time = timeConverter(test.time);

  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.header}>{test.name}</h1>
      <Countdown
        date={Date.now() + time}
        daysInHours
        className={styles.counter}
        onComplete={onComplete}
      />
    </div>
  );
};
