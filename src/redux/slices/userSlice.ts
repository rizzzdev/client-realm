import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean,
  username: string,
  password: string
}

export interface RegisterState {
  username: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName?: string,
}

export interface UserState {
  login: LoginState,
  register: RegisterState
}

const userStateLS = JSON.parse(window?.localStorage?.getItem('login-state') ?? '{}')

const userState: UserState = {
  login: {
    isLogin: userStateLS.isLogin ?? false,
    username: userStateLS.username ?? '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setLogin: (state: UserState, action: PayloadAction<LoginState>) => {
      return {
        ...state,
        login: action.payload
      }
    },
    setRegister: (state: UserState, action: PayloadAction<RegisterState>) => {
      return {
        ...state,
        register: action.payload
      }
    },
  },
})

export const { setLogin, setRegister } = userSlice.actions
export const userReducer = userSlice.reducer