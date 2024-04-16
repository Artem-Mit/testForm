import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionWithShortAnswerModel } from "@/api/types";
import { FormData } from "@/types";
import styles from "./testQuestionWithAnswer.module.css";
import { Input } from "@mui/material";

type Props = QuestionWithShortAnswerModel & {
  setData: Dispatch<SetStateAction<FormData>>;
};

export const TestQuestionWithAnswer = ({ id, question, setData }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    const stateInStorage = localStorage.getItem("data");
    if (stateInStorage) {
      const componentState = JSON.parse(stateInStorage);
      setAnswer(componentState[id]);
    }
  }, [id]);

  useEffect(() => {
    setData((prev) => ({ ...prev, [id]: answer }));
  }, [answer, id, setData]);

  return (
    <>
      <p className={styles.question}>Вопрос: {question}</p>
      <fieldset className={styles.fieldset}>
        <Input
          className={styles.textField}
          id={`${question}`}
          name={`${question}`}
          value={answer}
          onChange={handleChange}
          placeholder={question}
          required
        />
      </fieldset>
    </>
  );
};
