import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Mark {
  readonly id?: string;
  mark: number;
  markedAt: Date;
  quizId?: string;
  testId?: string;
  userId: string;
  userFullName: string;
}

const marksState: Mark[] = [];

const markSlice = createSlice({
  name: "mark",
  initialState: marksState,
  reducers: {
    setMark: (state: Mark[] = marksState, action: PayloadAction<Mark>) => {
      return [...state, action.payload];
    },
    resetMark: () => {
      return marksState;
    },
  },
});

export const { setMark, resetMark } = markSlice.actions;
export const markReducer = markSlice.reducer;
