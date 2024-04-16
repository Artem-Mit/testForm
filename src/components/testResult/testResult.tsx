import { Questions } from "@/api";
import { FormData } from "@/types";
import styles from './testResult.module.css';
import { Button } from "@mui/material";

type Props = {
  questions: Questions;
  formData: FormData;
};

export const TestResult = ({ questions, formData }: Props) => {
  const tryAgain = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.result}>
      <h1 className={styles.header}>Поздравляю!</h1>
      <div>
        <h2>Ваш результат:</h2>
        {questions.map((question) => (
          <p key={question.id} className={styles.question}>
            {question.question}
            <span className={styles.answer}>
              {typeof formData[question.id] === "object"
                ? JSON.stringify(formData[question.id])
                : formData[question.id]}
            </span>
          </p>
        ))}
        <Button onClick={tryAgain} variant="contained">Пройти тест еще раз</Button>
      </div>
    </div>
  );
};
