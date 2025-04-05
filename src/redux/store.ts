import { configureStore } from "@reduxjs/toolkit";
import { commonReducer } from "./slices/commonSlice";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { materialsReducer } from "./slices/materialsSlice";
import { questionsReducer } from "./slices/questionSlice";
import { leaderboardReducer } from "./slices/leaderboardSlice";
import { simulationReducer } from "./slices/simulationSlice";
import { activityReducer } from "./slices/activitySlice";
import { usersReducer } from "./slices/usersSlice";
import { markReducer } from "./slices/markSlice";
import { quizzesReducer } from "./slices/quizSlice";
import { testsReducer } from "./slices/testSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    auth: authReducer,
    materials: materialsReducer,
    questions: questionsReducer,
    leaderboard: leaderboardReducer,
    simulation: simulationReducer,
    activity: activityReducer,
    users: usersReducer,
    mark: markReducer,
    quizzes: quizzesReducer,
    tests: testsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
