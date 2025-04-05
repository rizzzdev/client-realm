import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  isLogin?: boolean;
  username: string;
  fullName: string;
  gender: string;
  avatarUrl: string;
  accessToken?: string;
  role: string;
  signedUpAt?: Date;
  deletedAt?: Date;
}

const userState: UserState = {
  id: "",
  isLogin: false,
  username: "",
  fullName: "",
  gender: "",
  avatarUrl: "",
  accessToken: "",
  role: "",
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
