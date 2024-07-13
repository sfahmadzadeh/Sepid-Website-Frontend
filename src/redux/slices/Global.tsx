import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadProgress: null,
}

const GlobalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      return {
        ...state,
        uploadProgress: action.payload
      }
    }
  },
})

export const {
  setUploadProgress
} = GlobalSlice.actions;

export const { reducer: GlobalReducer } = GlobalSlice;
