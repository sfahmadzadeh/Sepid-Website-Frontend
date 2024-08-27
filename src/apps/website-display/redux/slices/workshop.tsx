import { createSlice } from '@reduxjs/toolkit';

import { Apis } from 'apps/website-display/redux/apis';
import { createAsyncThunkApi } from 'apps/website-display/redux/apis/cerateApiAsyncThunk';
import {
  reviewAnswersUrl,
  addMentorToWorkshopUrl,
  edgeUrl,
  getFSMPlayersUrl,
  getAllWorkshopMentors,
  removeMentorURL,
} from 'apps/website-display/redux/constants/urls';

type FSMInitialStateType = any;

const initialState: FSMInitialStateType = {
  currentState: {
    widgets: [],
  },
  isFetching: false,
  allStates: [],
  allWorkshopEdges: [],
  workshop: null,
  answers: [],
  players: null,
  allWorkshopMentors: [],
};

export const getAnswersForReviewAction = createAsyncThunkApi(
  'workshop/reviewAnswerAction',
  Apis.GET,
  reviewAnswersUrl
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

// for mentors
export const getFSMPlayersAction = createAsyncThunkApi(
  'workshop/getFSMPlayersAction',
  Apis.GET,
  getFSMPlayersUrl,
)

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'workshop/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
    },
  }
);

export const getAllWorkshopMentorsAction = createAsyncThunkApi(
  'account/getAllWorkshopMentorsAction',
  Apis.GET,
  getAllWorkshopMentors
);

export const removeMentorFromWorkshopAction = createAsyncThunkApi(
  'programs/removeMentorFromWorkshopAction',
  Apis.POST,
  removeMentorURL,
);

const IndexSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {},
  extraReducers: {

    [getAnswersForReviewAction.pending.toString()]: isFetching,
    [getAnswersForReviewAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answers = response;
      state.isFetching = false;
    },
    [getAnswersForReviewAction.rejected.toString()]: isNotFetching,

    [getFSMPlayersAction.pending.toString()]: isFetching,
    [getFSMPlayersAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.players = response;
      state.isFetching = false;
    },
    [getFSMPlayersAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopMentorsAction.pending.toString()]: isFetching,
    [getAllWorkshopMentorsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopMentors = response;
      state.isFetching = false;
    },
    [getAllWorkshopMentorsAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: workshopReducer } = IndexSlice;
