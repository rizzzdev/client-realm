import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  isLogin: boolean;
  username: string;
  fullName: string;
  gender: string;
  avatarUrl: string;
  accessToken: string;
}

const userState: UserState = {
  id: "",
  isLogin: false,
  username: "",
  fullName: "",
  gender: "",
  avatarUrl: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "student",
  initialState: userState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser: () => {
      return userState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
