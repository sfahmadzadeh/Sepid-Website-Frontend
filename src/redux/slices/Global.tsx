import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadProgress: 0
}

const GlobalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      console.log(action.payload);
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
