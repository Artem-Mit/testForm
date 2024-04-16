import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TestQuestionModel } from "@/api/types";
import { FormData } from "@/types";
import styles from "./testQuestionMultiAnswer.module.css";
import { Checkbox } from "@mui/material";

type Props = TestQuestionModel & {
  setData: Dispatch<SetStateAction<FormData>>;
};

export const TestQuestionMultiAnswer = ({
  id,
  answers,
  question,
  setData,
}: Props) => {
  const [checkBoxes, setCheckboxes] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (checked) {
      setCheckboxes([...checkBoxes, name]);
    } else {
      setCheckboxes(checkBoxes.filter((name) => e.target.name != name));
    }
  };

  useEffect(() => {
    const stateInStorage = localStorage.getItem("data");
    if (stateInStorage) {
      const componentState = JSON.parse(stateInStorage);
      setCheckboxes(componentState[id]);
    }
  }, [id]);

  useEffect(() => {
    setData((prev) => ({ ...prev, [id]: checkBoxes }));
  }, [checkBoxes, id, setData]);

  return (
    <>
      <p className={styles.question}>Вопрос: {question}</p>
      <fieldset className={styles.fieldset}>
        {answers.map((answer) => (
          <label htmlFor={`${answer.id}`} key={answer.id}>
            <Checkbox
              id={`${answer.id}`}
              name={`${answer.answerText}`}
              onChange={handleChange}
              checked={checkBoxes.includes(`${answer.answerText}`)}
              size="small"
            />
            {answer.answerText}
          </label>
        ))}
      </fieldset>
    </>
  );
};
