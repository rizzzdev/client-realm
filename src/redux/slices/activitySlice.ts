import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Activity {
  readonly id?: string;
  activityType: "QUIZ" | "TEST" | "MATERIAL" | "SIMULATION";
  materialId?: string;
  testId?: string;
  quizId?: string;
  message: string;
  userId: string;
  username?: string;
  userFullname?: string;
  doneAt: Date;
}

const activitiesState: Activity[] = [];

const activitySlice = createSlice({
  name: "activities",
  initialState: activitiesState,
  reducers: {
    setActivities: (
      state: Activity[] = activitiesState,
      action: PayloadAction<Activity>
    ) => {
      return [...state, action.payload];
    },
    resetActivities: () => {
      return activitiesState;
    },
  },
});

export const { resetActivities, setActivities } = activitySlice.actions;
export const activityReducer = activitySlice.reducer;
