export type TestQuestionModel = {
  id: number,
  isMultiAnswer: boolean,
  type: QuestionTypes.TestQuestion,
  question: string,
  answers: TestAnswerModel[]
}

export type TestAnswerModel = {
  id: number,
  answerText: string | number
}


export type QuestionWithShortAnswerModel = {
  id: number,
  type: QuestionTypes.QuestionWithShortAnswer,
  question: string,
}

export type QuestionWithLongAnswerModel = {
  id: number,
  type: QuestionTypes.QuestionWithLongAnswer,
  question: string,
}

export enum QuestionTypes {
  TestQuestion = 'testQuestion',
  QuestionWithShortAnswer = 'QuestionWithShortAnswer',
  QuestionWithLongAnswer = 'QuestionWithLongAnswer'
}

export type Test = {
  name: string,
  time: string,
  questions: Questions,
}

export type Questions = (TestQuestionModel | QuestionWithShortAnswerModel | QuestionWithLongAnswerModel)[];

