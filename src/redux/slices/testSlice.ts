import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "./activitySlice";
import { Mark } from "./markSlice";
import { QuestionState } from "./questionSlice";

export interface TestState {
  readonly id?: string;
  activity: Activity[];
  questions: QuestionState[];
  mark: Mark[];
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  deletedAt?: Date;
}

const testsState: TestState[] = [];

const testsSlice = createSlice({
  name: "tests",
  initialState: testsState,
  reducers: {
    setTests: (
      state: TestState[] = testsState,
      action: PayloadAction<TestState>
    ) => {
      return [...state, action.payload];
    },
    resetTests: () => {
      return testsState;
    },
  },
});

export const { setTests, resetTests } = testsSlice.actions;
export const testsReducer = testsSlice.reducer;
