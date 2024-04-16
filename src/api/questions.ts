import { Test, QuestionTypes } from "./index";

export const test: Test = {
  name: 'Тестовый тест для тестировщиков',
  time: '00:01:30',
  questions: [
    {
      id: 1,
      isMultiAnswer: false,
      question: "42 + 15?",
      type: QuestionTypes.TestQuestion,
      answers: [
        {
          id: 1,
          answerText: 57,
        },
        {
          id: 2,
          answerText: 81,
        },
        {
          id: 3,
          answerText: 1000,
        },
      ],
    },
    {
      id: 2,
      isMultiAnswer: true,
      question: "Кто сделал форму?",
      type: QuestionTypes.TestQuestion,
      answers: [
        {
          id: 1,
          answerText: "Кто-то",
        },
        {
          id: 2,
          answerText: "Я",
        },
        {
          id: 3,
          answerText: "Мы",
        },
      ],
    },
    {
      id: 3,
      type: QuestionTypes.QuestionWithShortAnswer,
      question: "Кто убил Кенни?",
    },
    {
      id: 4,
      type: QuestionTypes.QuestionWithLongAnswer,
      question: "Расскажите что-то о себе",
    },
  ],
};
