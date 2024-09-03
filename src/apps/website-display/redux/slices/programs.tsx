import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  deleteInvitationUrl,
  getCertificateUrl,
  getMyInvitationsUrl,
  getTeamInvitationsUrl,
  inviteSomeoneUrl,
  respondInvitationUrl,
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

export const getTeamInvitationsAction = createAsyncThunkApi(
  'programs/getTeamInvitationsAction',
  Apis.GET,
  getTeamInvitationsUrl
);

export const getMyInvitationsAction = createAsyncThunkApi(
  'programs/getMyInvitationsAction',
  Apis.GET,
  getMyInvitationsUrl
);

export const inviteSomeoneAction = createAsyncThunkApi(
  'programs/inviteSomeoneAction',
  Apis.POST,
  inviteSomeoneUrl,
  {
    defaultNotification: {
      success: 'دعوت‌نامه‌ی شما با موفقیت ارسال شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const deleteInvitationAction = createAsyncThunkApi(
  'programs/deleteInvitationAction',
  Apis.DELETE,
  deleteInvitationUrl,
  {
    defaultNotification: {
      success: 'دعوت‌نامه پس گرفته شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const respondInvitationAction = createAsyncThunkApi(
  'programs/respondInvitationAction',
  Apis.POST,
  respondInvitationUrl,
  {
    defaultNotification: {
      success: 'پاسخ به دعوت‌نامه با موفقیت ثبت شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

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

    [getTeamInvitationsAction.pending.toString()]: isFetching,
    [getTeamInvitationsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.teamInvitations = response;
    },
    [getTeamInvitationsAction.rejected.toString()]: isNotFetching,

    [inviteSomeoneAction.pending.toString()]: isFetching,
    [inviteSomeoneAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.teamInvitations = [response, ...state.teamInvitations];
    },
    [inviteSomeoneAction.rejected.toString()]: isNotFetching,

    [deleteInvitationAction.pending.toString()]: isFetching,
    [deleteInvitationAction.fulfilled.toString()]: (state, action) => {
      state.isFetching = false;
      let newTeamInvitations = [...state.teamInvitations];
      for (let i = 0; i < newTeamInvitations.length; i++) {
        if (newTeamInvitations[i].id == action.meta.arg.invitationId) {
          newTeamInvitations.splice(i, 1); // todo
        }
      }
      state.teamInvitations = newTeamInvitations;
    },
    [deleteInvitationAction.rejected.toString()]: isNotFetching,

    [getMyInvitationsAction.pending.toString()]: isFetching,
    [getMyInvitationsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.myInvitations = response;
    },
    [getMyInvitationsAction.rejected.toString()]: isNotFetching,

    [respondInvitationAction.pending.toString()]: isFetching,
    [respondInvitationAction.fulfilled.toString()]: (state, action) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // let newMyInvitations = [...state.myInvitations];
      // for (let i = 0; i < newMyInvitations.length; i++) {
      //   if (newMyInvitations[i].id == action.meta.arg.invitationId) {
      //     newMyInvitations[i] = action.payload.response; //todo
      //   }
      // }
      // state.myInvitations = newMyInvitations;
    },
    [respondInvitationAction.rejected.toString()]: isNotFetching,

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
