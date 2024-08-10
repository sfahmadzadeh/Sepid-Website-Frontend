import { createSlice } from '@reduxjs/toolkit'

const initialState = { redirectTo: null, force: false }

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    resetRedirect: () => initialState
  },
  extraReducers: {

  }
})

export const { resetRedirect: resetRedirectAction } = redirectSlice.actions

export const { reducer: redirectReducer } = redirectSlice
