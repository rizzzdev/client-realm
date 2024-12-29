import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean,
  username: string,
  password: string
}

export interface RegisterState {
  username: string,
  password: string,
  firstName: string,
  lastName?: string,
}

export interface UserState {
  login: LoginState,
  register: RegisterState
}

const userState: UserState = {
  login: {
    isLogin: false,
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    handleLogin(state: UserState, action: PayloadAction<LoginState>) {
      return {
        ...state,
        login: action.payload
      }
    }
  },
})

export const { handleLogin } = userSlice.actions
export const userReducer = userSlice.reducer