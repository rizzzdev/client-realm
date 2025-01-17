import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
  id: string;
  question: string;
  imageUrl?: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD?: string;
  optionE?: string;
  activeOption?: "optionA" | "optionB" | "optionC" | "optionD" | "optionE";
  // correctOption: "optionA" | "optionB" | "optionC" | "optionD" | "optionE";
  correctOption: string;
}

const questionsState: QuestionState[] = [];

const questionsSlice = createSlice({
  name: "questions",
  initialState: questionsState,
  reducers: {
    setQuestions: (
      state: QuestionState[] = questionsState,
      action: PayloadAction<QuestionState[]>
    ) => {
      return [...state, ...action.payload];
    },
    setQuestionByIndex: (
      state: QuestionState[] = questionsState,
      action: PayloadAction<{ index: number; questionState: QuestionState }>
    ) => {
      state[action.payload.index] = {
        ...state[action.payload.index],
        ...action.payload.questionState,
      };
      return state;
    },
    resetQuestions: () => {
      return questionsState;
    },
  },
});

export const { setQuestions, setQuestionByIndex, resetQuestions } =
  questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
