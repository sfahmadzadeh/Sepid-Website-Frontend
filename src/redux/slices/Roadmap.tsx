import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  roadmapCRUDUrl,
} from 'redux/constants/urls';

import { RoadmapInitialStateType } from 'types/redux/Roadmap'

const initialState: RoadmapInitialStateType = {
  playerTransitedPath: null,
  FSMRoadmap: null,
};

export const getPlayerTransitedPathAction = createAsyncThunkApi(
  'Roadmap/getPlayerTransitedPathAction',
  Apis.POST,
  `${roadmapCRUDUrl}get_player_taken_path/`,
);

export const getFSMRoadmapAction = createAsyncThunkApi(
  'Roadmap/getFSMRoadmapAction',
  Apis.POST,
  `${roadmapCRUDUrl}get_fsm_roadmap/`,
);


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const RoadmapSlice = createSlice({
  name: 'Roadmap',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlayerTransitedPathAction.pending.toString()]: isFetching,
    [getPlayerTransitedPathAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.playerTransitedPath = response;
    },
    [getPlayerTransitedPathAction.rejected.toString()]: isNotFetching,

    [getFSMRoadmapAction.pending.toString()]: isFetching,
    [getFSMRoadmapAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.FSMRoadmap = {
        firstStateName: response.first_state_name,
        links: response.links,
      }
    },
    [getFSMRoadmapAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: RoadmapReducer } = RoadmapSlice;
