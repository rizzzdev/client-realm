import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CommonState {
  isLoading: boolean,
  isButtonDisabled: boolean,
}

const commonState: CommonState = {
  isLoading: true,
  isButtonDisabled: false
} 

const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    setLoading(state: CommonState, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    setButtonDisabled(state: CommonState, action: PayloadAction<boolean>) {
      return {
        ...state,
        isButtonDisabled: action.payload
      }
    }
  }
})

export const { setLoading, setButtonDisabled } = commonSlice.actions
export const commonReducer = commonSlice.reducer