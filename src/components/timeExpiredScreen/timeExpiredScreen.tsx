import styles from './timeExpiredScreen.module.css';

export const TimeExpiredScreen = () => {
  return (
    <div className={styles.timeExpiredContainer}>
      <h1 className={styles.timeExpired}>Время вышло!!!</h1>
    </div>
  );
};
