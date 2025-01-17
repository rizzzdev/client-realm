import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Leaderboard } from "~/types/leaderboard";

const leaderboardState: Leaderboard[] = [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: leaderboardState,
  reducers: {
    setLeaderboard: (
      state: Leaderboard[] = leaderboardState,
      action: PayloadAction<Leaderboard[]>
    ) => {
      return [...state, ...action.payload];
    },
    resetLeaderboard: () => {
      return leaderboardState;
    },
  },
});

export const { setLeaderboard, resetLeaderboard } = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
