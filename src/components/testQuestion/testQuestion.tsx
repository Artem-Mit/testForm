import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TestQuestionModel } from "@/api/types";
import { FormData } from "@/types";
import styles from "./testQuestion.module.css";
import { Radio } from "@mui/material";

type Props = TestQuestionModel & {
  setData: Dispatch<SetStateAction<FormData>>;
};

export const TestQuestion = ({ id, question, answers, setData }: Props) => {
  const [state, setState] = useState<FormData>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ [id]: e.target.value });
    setData((prevData) => ({ ...prevData, [id]: e.target.value }));
  };

  useEffect(() => {
    const stateInStorage = localStorage.getItem("data");
    if (stateInStorage) {
      const componentState = JSON.parse(stateInStorage);
      setState({ [id]: componentState[id] });
    }
  }, [id]);

  return (
    <>
      <p className={styles.question}>Вопрос: {question}</p>
      <fieldset className={styles.fieldset}>
        {answers.map((answer) => (
          <label htmlFor={`${answer.id}`} key={answer.id}>
            <Radio
              size="small"
              id={`${answer.id}`}
              name={`${question}`}
              value={answer.answerText}
              onChange={handleChange}
              checked={state[id] == answer.answerText}
              required
            />
            {answer.answerText}
          </label>
        ))}
      </fieldset>
    </>
  );
};
