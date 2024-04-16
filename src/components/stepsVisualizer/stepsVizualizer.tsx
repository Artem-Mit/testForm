import { ReactElement } from "react";
import styles from "./stepsVisualizer.module.css";

type Props = {
  steps: ReactElement[];
  currentStepIndex: number;
};

export const StepsVizualizer = ({ steps, currentStepIndex }: Props) => {
  return (
    <div className={styles.stepsContainer}>
      {steps.map((_, i) => {
        const isPrevious =
          currentStepIndex <= i
            ? styles.step
            : `${styles.step} ${styles.step_active}`;
        const isCurrent = currentStepIndex === i ? styles.step_current : "";
        return <div key={i} className={`${isPrevious} ${isCurrent}`} />;
      })}
    </div>
  );
};
