import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface LoadingState {
  isLoading: boolean
}

const loadingState: LoadingState = {
  isLoading: true
} 

const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingState,
  reducers: {
    setLoading(state: LoadingState, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    }
  }
})

export const { setLoading } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer