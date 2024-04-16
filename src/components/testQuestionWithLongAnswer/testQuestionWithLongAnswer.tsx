import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionWithLongAnswerModel } from "@/api/types";
import { FormData } from "@/types";
import styles from "./testQuestionWithLongAnswer.module.css";
import { TextField } from "@mui/material";

type Props = QuestionWithLongAnswerModel & {
  setData: Dispatch<SetStateAction<FormData>>;
};

export const TestQuestionWithLongAnswer = ({ id, question, setData }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  }, [answer, setData, id]);

  return (
    <>
      <p className={styles.question}>Вопрос: {question}</p>
      <fieldset className={styles.fieldset}>
        <TextField
          multiline
          rows={2}
          className={styles.textField}
          id={`${question}`}
          name={`${question}`}
          value={answer}
          onChange={handleChange}
          placeholder={question}
        />
      </fieldset>
    </>
  );
};
