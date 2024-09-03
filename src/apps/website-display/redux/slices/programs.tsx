import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  getCertificateUrl,
  addMentorToWorkshopUrl,
  registerUsersViaCSVUrl,
  getPlayerFromTeamUrl,
  validateRegistrationReceiptUrl,
} from '../constants/urls';
import { getRequests, deleteRequest } from 'apps/website-display/parse/mentor'
import { InitialState } from 'commons/types/redux/program'

const initialState: InitialState = {
  isFetching: false,
  workshops: [],
  workshopsCount: 0,
  programs: [],
  program: null,
  uploadedFile: { link: '', name: '', id: '' },
  myInvitations: [],
  teamInvitations: [],
  allRegistrationReceipts: [],
  registrationReceipt: null,
  widgets: [],
  allProgramTeams: [],
  teamsRequests: null,
  myWorkshops: [],
  registrationForm: null,
  merchandise: null,
  discountedPrice: 0,
  team: null,
  certificateLink: '',
  playerId: {},
  teamCurrentState: null,
};

export const getCertificateAction = createAsyncThunkApi(
  'programs/getCertificate',
  Apis.GET,
  getCertificateUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت گواهی حضور وجود داشت.',
    },
  }
);

export const registerUsersViaCSVAction = createAsyncThunkApi(
  'programs/registerUsersViaCSVAction',
  Apis.POST_FORM_DATA,
  registerUsersViaCSVUrl,
  {
    defaultNotification: {
      success: 'کاربران در دست افزودن قرار گرفتند...',
      error: 'اشکالی در افزودن کاربران وجود داشت.'
    },
  }
);

export const validateRegistrationReceiptAction = createAsyncThunkApi(
  'programs/validateRegistrationReceiptAction',
  Apis.POST,
  validateRegistrationReceiptUrl,
  {
    defaultNotification: {
      success: 'وضعیت رسید ثبت‌نام با موفقیت ثبت شد.',
    },
  }
);

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'programs/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
);

export const getPlayerFromTeamAction = createAsyncThunkApi(
  'programs/getPlayerFromTeamAction',
  Apis.POST,
  getPlayerFromTeamUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
  }
);

export const getRequestMentorAction = createAsyncThunk(
  'requestMentor/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const requests = await getRequests();
      const teamsRequests = {};
      requests.forEach((request) => {
        const teamId = request.get('teamId');
        const playerId = request.get('playerId');
        const fsmId = request.get('fsmId');
        teamsRequests[teamId + '.' + fsmId] = playerId;
      });
      return { teamsRequests };
    } catch (err) {
      return rejectWithValue({
        message: 'مشکلی در دریافت درخواست‌‌های همیار وجود داشت.',
      });
    }
  }
);

export const deleteRequestMentorAction = createAsyncThunk<any, { teamId: string, fsmId: string }>(
  'requestMentor/delete',
  async ({ teamId, fsmId }, { rejectWithValue }) => {
    try {
      await deleteRequest({ teamId, fsmId });
    } catch (err) {
      return rejectWithValue({
        message: 'مشکلی در پاک‌کردن درخواست وجود دارد.',
      });
    }
  }
);

// end of mentor programs

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    createRequestMentor: (state, { payload: { playerId, teamId, fsmId } }) => {
      state.teamsRequests[teamId + '.' + fsmId] = playerId;
    },
    removeRequestMentor: (state, { payload: { teamId, fsmId } }) => {
      delete state.teamsRequests[teamId + '.' + fsmId];
    },
    createNewTeamState: (state, { payload: { uuid, paperId, currentStateName, teamEnterTimeToState } }) => {
      state.teamCurrentState = { uuid, paperId, currentStateName, teamEnterTimeToState };
    },
    updateNewTeamState: (state, { payload: { uuid, paperId, currentStateName, teamEnterTimeToState } }) => {
      state.teamCurrentState = { uuid, paperId, currentStateName, teamEnterTimeToState };
    },
  },
  extraReducers: {

    [getCertificateAction.pending.toString()]: isFetching,
    [getCertificateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.certificateLink = response.certificate;
      state.isFetching = false;
    },
    [getCertificateAction.rejected.toString()]: isNotFetching,

    // mentor slices
    [getPlayerFromTeamAction.fulfilled.toString()]: (state, { payload, meta }) => {
      const newPlayerId = { ...state.playerId };
      newPlayerId[meta.arg.teamId] = payload.response.id;
      state.playerId = newPlayerId;
      // window.open(
      //   `https://kamva.academy/join/${payload?.response?.id}/${meta?.arg?.accessToken}/`
      // );
    },

    [getRequestMentorAction.fulfilled.toString()]: (state, { payload: { teamsRequests } }) => {
      state.teamsRequests = teamsRequests;
    },

    [deleteRequestMentorAction.fulfilled.toString()]: (state, { meta: { arg } }) => {
      delete state.teamsRequests[arg.teamId + '.' + arg.fsmId];
    },

    [registerUsersViaCSVAction.pending.toString()]: isFetching,
    [registerUsersViaCSVAction.fulfilled.toString()]: isNotFetching,
    [registerUsersViaCSVAction.rejected.toString()]: isNotFetching,
  },
});

export const {
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
} = programSlice.actions;

export const { reducer: programsReducer } = programSlice;
