import { configureStore } from "@reduxjs/toolkit";
import { commonReducer } from "./slices/commonSlice";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { materialsReducer } from "./slices/materialsSlice";
import { questionsReducer } from "./slices/questionSlice";
import { leaderboardReducer } from "./slices/leaderboardSlice";
import { simulationReducer } from "./slices/simulationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    auth: authReducer,
    materials: materialsReducer,
    questions: questionsReducer,
    leaderboard: leaderboardReducer,
    simulation: simulationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
