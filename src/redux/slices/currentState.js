import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestMentor } from 'parse/mentor'
import { Apis } from 'redux/apis'
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk'
import {
  getScoresUrl
} from '../constants/urls'

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

export const getScoresAction = createAsyncThunkApi(
  'player/getScore',
  Apis.POST,
  getScoresUrl,
  {
    bodyCreator: ({ fsmId, playerId }) => ({ fsm: fsmId, player: playerId })
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
  extraReducers: {
    [getScoresAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.scores = response.score_transactions
      state.totalScore = response.scores_sum
    }
  }
})

export const { changeOpenChatRoom: changeOpenChatRoomAction } =
  currentStateSlice.actions

export const { reducer: currentStateReducer } = currentStateSlice
