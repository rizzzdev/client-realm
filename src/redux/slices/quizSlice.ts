import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mark } from "./markSlice";
import { QuestionState } from "./questionSlice";

export interface Quiz {
  readonly id?: string;
  createdAt?: Date;
  materialId: string;
  questions: QuestionState[];
  marks: Mark[];
}

export interface Quizzes {
  quizzesList: Quiz[];
  currentQuiz: Quiz;
}

const quizzesState: Quizzes = {
  quizzesList: [],
  currentQuiz: {
    id: "",
    materialId: "",
    questions: [],
    marks: [],
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: quizzesState,
  reducers: {
    setQuizzes: (state: Quizzes, action: PayloadAction<Quizzes>) => {
      return { ...state, ...action.payload };
    },
    resetQuizzes: () => {
      return quizzesState;
    },
  },
});

export const { setQuizzes, resetQuizzes } = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;
