import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

const usersState: UserState[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState: usersState,
  reducers: {
    setUsers: (
      state: UserState[] = usersState,
      action: PayloadAction<UserState>
    ) => {
      return [...state, action.payload];
    },
    resetUsers: () => {
      return usersState;
    },
  },
});

export const { setUsers, resetUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
