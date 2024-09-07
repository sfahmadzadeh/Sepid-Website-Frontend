import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestMentor } from 'apps/website-display/parse/mentor'

export const requestMentorAction = createAsyncThunk(
  'requestMentor',
  async ({ playerId, teamId, fsmId }, { rejectWithValue }) => {
    try {
      await requestMentor({ playerId, teamId, fsmId })
      return {
        message: 'درخواست شما ارسال شد.'
      }
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!'
      })
    }
  }
)

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    openChatRoom: false,
    isFetching: false,
    state: {
      widgets: [],
      hints: []
    },
    scores: [],
    totalScore: 0
  },
  reducers: {
    changeOpenChatRoom: (state, actions) => {
      state.openChatRoom = !state.openChatRoom
    }
  },
  extraReducers: {}
})

export const { changeOpenChatRoom: changeOpenChatRoomAction } =
  currentStateSlice.actions

export const { reducer: currentStateReducer } = currentStateSlice
