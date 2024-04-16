import {
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { Questions, QuestionTypes } from "@/api";
import { TestQuestion } from "@/components/testQuestion";
import { TestQuestionMultiAnswer } from "@/components/testQuestionMultiAnswer";
import { TestQuestionWithAnswer } from "@/components/testQuestionWithAnswer";
import { TestQuestionWithLongAnswer } from "@/components/testQuestionWithLongAnswer";
import { StepsVizualizer } from "@/components/stepsVisualizer";
import { TestResult } from "../testResult";
import { FormData } from "@/types";
import styles from "./form.module.css";
import { Button } from "@mui/material";

type Props = {
  completed: boolean;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  questions: Questions;
};

export const Form = ({ completed, setCompleted, questions }: Props) => {
  const [questionsToRender, setQuestionsToRender] = useState<ReactElement[]>(
    []
  );

  const [formData, setFormData] = useState<FormData>({});

  const {
    steps,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    currentStepIndex,
    goTo,
  } = useMultistepForm(questionsToRender);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(formData));
    localStorage.setItem("step", JSON.stringify(currentStepIndex + 1));
    if (!isLastStep) return next();
    setCompleted((prev) => !prev);
  };

  const onBackButtonClick = () => {
    localStorage.setItem("step", JSON.stringify(currentStepIndex - 1));
    back();
  };

  const questionFormSwitcher = (questions: Questions): ReactElement[] => {
    return questions.map((question) => {
      if (
        question.type === QuestionTypes.TestQuestion &&
        !question.isMultiAnswer
      ) {
        return <TestQuestion {...question} setData={setFormData} />;
      }
      if (
        question.type === QuestionTypes.TestQuestion &&
        question.isMultiAnswer
      ) {
        return <TestQuestionMultiAnswer {...question} setData={setFormData} />;
      }
      if (question.type === QuestionTypes.QuestionWithShortAnswer) {
        return <TestQuestionWithAnswer {...question} setData={setFormData} />;
      }
      if (question.type === QuestionTypes.QuestionWithLongAnswer) {
        return (
          <TestQuestionWithLongAnswer {...question} setData={setFormData} />
        );
      }
      return <p>Вопрос не загрузился :(</p>;
    });
  };

  useEffect(() => {
    setQuestionsToRender(questionFormSwitcher(questions));
    questions.map((question) => {
      setFormData((prev) => ({ ...prev, [question.id]: "" }));
    });
  }, [questions]);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("data");
    if (dataFromStorage) {
      setFormData(() => ({ ...JSON.parse(dataFromStorage) }));
    }
  }, []);

  useEffect(() => {
    const stepFromStorage = localStorage.getItem("step");
    if (stepFromStorage) {
      goTo(JSON.parse(stepFromStorage));
    }
  });

  if (completed) {
    return <TestResult questions={questions} formData={formData} />;
  }

  return (
    <div className={styles.formContainer}>
      <StepsVizualizer steps={steps} currentStepIndex={currentStepIndex} />
      <form className={styles.form} onSubmit={onSubmit}>
        {step}
        <div className={styles.buttons}>
          {!isFirstStep && (
            <Button
              type="button"
              onClick={onBackButtonClick}
              variant="contained"
            >
              Back
            </Button>
          )}
          <Button type="submit" variant="contained">
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};
