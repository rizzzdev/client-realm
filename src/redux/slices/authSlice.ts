import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SigninState {
  username: string;
  password: string;
  signinWarning: string;
}

export interface SignupState {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  gender: string;
  signupWarning: string;
}

export interface AuthState {
  signin: SigninState;
  signup: SignupState;
}

const authState: AuthState = {
  signin: {
    username: "",
    password: "",
    signinWarning: "",
  },
  signup: {
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
    signupWarning: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setSignin: (
      state: AuthState = authState,
      action: PayloadAction<SigninState>
    ) => {
      return {
        ...state,
        signin: { ...action.payload },
      };
    },
    resetSignin: (state: AuthState = authState) => {
      return {
        ...state,
        signin: authState.signin,
      };
    },
    setSignup: (
      state: AuthState = authState,
      action: PayloadAction<SignupState>
    ) => {
      return {
        ...state,
        signup: { ...action.payload },
      };
    },
    resetSignup: (state: AuthState = authState) => {
      return {
        ...state,
        signup: authState.signup,
      };
    },
  },
});

export const { setSignin, resetSignin, setSignup, resetSignup } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
