import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  deleteInvitationUrl,
  getProgramsUrl,
  getAllUserMerchandisesUrl,
  getCertificateUrl,
  getProgramRegistrationInfoUrl,
  getMyInvitationsUrl,
  getOneRegistrationFormUrl,
  getTeamInvitationsUrl,
  getTeamUrl,
  registerOneUserUrl,
  getWorkshopsUrl,
  inviteSomeoneUrl,
  paymentRequestUrl,
  purchaseProgramUrl,
  registrationReceiptUrl,
  respondInvitationUrl,
  submitDiscountCodeUrl,
  submitRegistrationFormUrl,
  TeamCRUDUrl,
  addMentorToWorkshopUrl,
  registerUsersViaCSVUrl,
  addUserToTeamUrl,
  allRegistrationReceiptsUrl,
  programInfoUrl,
  getPlayerFromTeamUrl,
  getTeamsUrl,
  makeTeamHeadUrl,
  removeFromTeamUrl,
  registrationFormCRUDUrl,
  validateRegistrationReceiptUrl,
  workshopCRUDUrl,
  createTeamAndJoinActionUrl,
} from '../constants/urls';
import { getRequests, deleteRequest } from 'parse/mentor'
import { InitialState } from 'types/redux/program'

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
  merchandise: {},
  discountedPrice: 0,
  team: null,
  certificateLink: '',
  playerId: {},
  teamCurrentState: null,
};

export const getProgramsAction = createAsyncThunkApi(
  'programs/getProgramsAction',
  Apis.GET,
  getProgramsUrl
);

export const getOneRegistrationFormAction = createAsyncThunkApi(
  'programs/getOneRegistrationFormAction',
  Apis.GET,
  getOneRegistrationFormUrl
);

export const submitRegistrationFormAction = createAsyncThunkApi(
  'programs/submitRegistrationFormAction',
  Apis.POST,
  submitRegistrationFormUrl,
  {
    bodyCreator: ({ answers, onSuccess, onFailure }) => ({
      answer_sheet_type: 'RegistrationReceipt',
      answers,
      onSuccess,
      onFailure,
    }),
    defaultNotification: {
      success: 'فرم ثبت‌نام با موفقیت ثبت شد!',
    },
  }
);

export const applyDiscountCodeAction = createAsyncThunkApi(
  'programs/applyDiscountCodeAction',
  Apis.POST,
  submitDiscountCodeUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت اعمال شد!',
    },
  }
);

export const getOneMerchandiseAction = createAsyncThunkApi(
  'programs/getOneMerchandiseAction',
  Apis.GET,
  getAllUserMerchandisesUrl
);

export const purchaseProgramAction = createAsyncThunkApi(
  'programs/purchaseProgramAction',
  Apis.POST,
  purchaseProgramUrl,
  {
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
      error:
        'مشکلی در ارتباط با سرور پرداخت وجود دارد. اگر از VPN استفاده می‌کنید، آن را خاموش کن!',
    },
  }
);

export const getOneRegistrationReceiptAction = createAsyncThunkApi(
  'programs/getOneRegistrationReceiptAction',
  Apis.GET,
  registrationReceiptUrl
);


export const getTeamAction = createAsyncThunkApi(
  'programs/getTeamAction',
  Apis.GET,
  getTeamUrl
);

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


export const createTeamAction = createAsyncThunkApi(
  'programs/createTeamAction',
  Apis.POST,
  TeamCRUDUrl,
  {
    defaultNotification: {
      success: 'گروه با موفقیت ساخته شد.',
      error: 'مشکلی وجود داشت.',
    },
  }
);

export const createTeamAndJoinAction = createAsyncThunkApi(
  'programs/createTeamAndJoinAction',
  Apis.POST,
  createTeamAndJoinActionUrl,
  {
    defaultNotification: {
      success: 'گروه با موفقیت ساخته شد.',
      error: 'مشکلی وجود داشت.',
    },
  }
);

export const updateTeamChatRoomLinkAction = createAsyncThunkApi(
  'programs/updateTeamChatRoomLinkAction',
  Apis.PATCH,
  TeamCRUDUrl,
  {
    defaultNotification: {
      success: 'اتاق گفت‌وگوی گروه با موفقیت تغییر کرد.',
      error: 'مشکلی وجود داشت.',
    },
  }
);


export const deleteTeamAction = createAsyncThunkApi(
  'programs/deleteTeamAction',
  Apis.DELETE,
  TeamCRUDUrl,
  {
    defaultNotification: {
      success: 'گروه با موفقیت حذف شد.',
      error: 'مشکلی وجود داشت.',
    },
  }
);

export const getProgramRegistrationInfoAction = createAsyncThunkApi(
  'programs/getProgramRegistrationInfo',
  Apis.POST,
  getProgramRegistrationInfoUrl,
  {
    bodyCreator: ({ programId, memberUuid }) => ({
      program_id: programId,
      member_uuid: memberUuid,
    }),
  }
);

export const paymentRequestAction = createAsyncThunkApi(
  'programs/paymentRequest',
  Apis.POST,
  paymentRequestUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
    },
  }
);

export const applyDiscountAction = createAsyncThunkApi(
  'programs/applyDiscount',
  Apis.POST,
  applyDiscountUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
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

// mentor programs:
export const getRegistrationFormAction = createAsyncThunkApi(
  'programs/getRegistrationFormAction',
  Apis.GET,
  registrationFormCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت فرم ثبت‌نام وجود داشت.'
    },
  }
);


export const registerUsersViaCSVAction = createAsyncThunkApi(
  'programs/registerUsersViaCSVAction',
  Apis.POST_FORM_DATA,
  registerUsersViaCSVUrl,
  {
    defaultNotification: {
      success: 'کاربران با موفقیت ثبت‌نام شدند.',
      error: 'اشکالی در ثبت‌نام کردن کاربران وجود داشت.'
    },
  }
);

export const registerOneUserAction = createAsyncThunkApi(
  'programs/registerOneUserAction',
  Apis.POST,
  registerOneUserUrl,
  {
    defaultNotification: {
      success: 'کاربر با موفقیت ثبت‌نام شد.',
      error: 'اشکالی در ثبت‌نام کاربر وجود داشت.'
    },
  }
);

export const addUserToTeamAction = createAsyncThunkApi(
  'programs/addUserToTeamAction',
  Apis.POST,
  addUserToTeamUrl,
  {
    defaultNotification: {
      success: 'کاربر با موفقیت به گروه اضافه شد',
      error: 'اشکالی در اضافه‌کردن کاربر به گروه وجود داشت.'
    },
  }
);

export const editOneProgramInfoAction = createAsyncThunkApi(
  'programs/editOneProgramInfoAction',
  Apis.PATCH,
  programInfoUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

export const getAllRegistrationReceiptsAction = createAsyncThunkApi(
  'programs/getAllRegistrationReceiptsAction',
  Apis.GET,
  allRegistrationReceiptsUrl
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

export const getProgramTeamsAction = createAsyncThunkApi(
  'programs/getProgramTeamsAction',
  Apis.GET,
  getTeamsUrl
);

export const createWorkshopAction = createAsyncThunkApi(
  'programs/createWorkshopAction',
  Apis.POST,
  workshopCRUDUrl
);

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'programs/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
      error: 'شما دسترسی لازم برای این عملیات را ندارید.'
    },
  }
);

export const getPlayerFromTeamAction = createAsyncThunkApi(
  'programs/removeEdgeAction',
  Apis.POST,
  getPlayerFromTeamUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
  }
);

export const makeTeamHeadAction = createAsyncThunkApi(
  'programs/makeTeamHeadAction',
  Apis.POST,
  makeTeamHeadUrl,
  {
    bodyCreator: ({ receipt }) => ({
      receipt,
    }),
    defaultNotification: {
      success: 'سرگروه گروه با موفقیت تغییر کرد.',
    },
  }
);

export const removeFromTeamAction = createAsyncThunkApi(
  'programs/removeFromTeamAction',
  Apis.POST,
  removeFromTeamUrl,
  {
    bodyCreator: ({ receipt }) => ({
      receipt,
    }),
    defaultNotification: {
      success: 'کاربر از گروه با موفقیت حذف شد.',
    },
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
    [getProgramsAction.pending.toString()]: isFetching,
    [getProgramsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.programs = response;
      state.isFetching = false;
    },
    [getProgramsAction.rejected.toString()]: isNotFetching,

    [getOneRegistrationFormAction.pending.toString()]: isFetching,
    [getOneRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationForm = response;
      state.isFetching = false;
    },
    [getOneRegistrationFormAction.rejected.toString()]: isNotFetching,

    [getOneMerchandiseAction.pending.toString()]: isFetching,
    [getOneMerchandiseAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.merchandise = response;
    },
    [getOneMerchandiseAction.rejected.toString()]: isNotFetching,

    [submitRegistrationFormAction.pending.toString()]: isFetching,
    [submitRegistrationFormAction.fulfilled.toString()]: isNotFetching,
    [submitRegistrationFormAction.rejected.toString()]: isNotFetching,

    [purchaseProgramAction.pending.toString()]: isFetching,
    [purchaseProgramAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      window.location.href = response.payment_link; //todo
    },
    [purchaseProgramAction.rejected.toString()]: isNotFetching,

    [applyDiscountCodeAction.pending.toString()]: isFetching,
    [applyDiscountCodeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.discountedPrice = response.new_price;
    },
    [applyDiscountCodeAction.rejected.toString()]: isNotFetching,

    [getTeamAction.pending.toString()]: isFetching,
    [getTeamAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.team = response;
    },
    [getTeamAction.rejected.toString()]: isNotFetching,

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

    [createTeamAndJoinAction.pending.toString()]: isFetching,
    [createTeamAndJoinAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.team = response;
    },
    [createTeamAndJoinAction.rejected.toString()]: isNotFetching,

    [createTeamAction.pending.toString()]: isFetching,
    [createTeamAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.allProgramTeams = [response, ...state.allProgramTeams];
    },
    [createTeamAction.rejected.toString()]: isNotFetching,

    [updateTeamChatRoomLinkAction.pending.toString()]: isFetching,
    [updateTeamChatRoomLinkAction.fulfilled.toString()]: (state, { meta: { arg: { teamId } }, payload: { response: returnedTeam } }) => {
      state.allProgramTeams = [...state.allProgramTeams].map(team => team.id !== teamId ? team : { ...returnedTeam })
      state.isFetching = false;
    },
    [updateTeamChatRoomLinkAction.rejected.toString()]: isNotFetching,

    [deleteTeamAction.pending.toString()]: isFetching,
    [deleteTeamAction.fulfilled.toString()]: (state, { meta: { arg: { teamId } } }) => {
      state.allProgramTeams = [...state.allProgramTeams].filter(team => team.id != teamId)
      state.isFetching = false;
    },
    [deleteTeamAction.rejected.toString()]: isNotFetching,


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

    [getAllRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getAllRegistrationReceiptsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allRegistrationReceipts = response;
      state.isFetching = false;
    },
    [getAllRegistrationReceiptsAction.rejected.toString()]: isNotFetching,

    [getProgramTeamsAction.pending.toString()]: isFetching,
    [getProgramTeamsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allProgramTeams = response;
      state.isFetching = false;
    },
    [getProgramTeamsAction.rejected.toString()]: isNotFetching,

    [createWorkshopAction.pending.toString()]: isFetching,
    [createWorkshopAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.workshops = [...state.workshops, response];
      state.isFetching = false;
    },
    [createWorkshopAction.rejected.toString()]: isNotFetching,


    [makeTeamHeadAction.pending.toString()]: isFetching,
    [makeTeamHeadAction.fulfilled.toString()]: (state, action) => {
      let newAllProgramTeams = [...state.allProgramTeams];
      for (let i = 0; i < newAllProgramTeams.length; i++) {
        if (newAllProgramTeams[i].id == action.payload.response.id) {
          newAllProgramTeams[i] = action.payload.response;
        }
      }
      state.allProgramTeams = newAllProgramTeams;
      state.isFetching = false;
    },
    [makeTeamHeadAction.rejected.toString()]: isNotFetching,

    [addUserToTeamAction.pending.toString()]: isFetching,
    [addUserToTeamAction.fulfilled.toString()]: (state, action) => {
      let newAllProgramTeams = [...state.allProgramTeams];
      for (let i = 0; i < newAllProgramTeams.length; i++) {
        if (newAllProgramTeams[i].id == action.payload.response.id) {
          newAllProgramTeams[i] = action.payload.response;
        }
      }
      state.allProgramTeams = newAllProgramTeams;
      state.isFetching = false;
    },
    [addUserToTeamAction.rejected.toString()]: isNotFetching,


    [getOneRegistrationReceiptAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationReceipt = response;
      state.isFetching = false;
    },
    [getOneRegistrationReceiptAction.rejected.toString()]: isNotFetching,


    [registerUsersViaCSVAction.pending.toString()]: isFetching,
    [registerUsersViaCSVAction.fulfilled.toString()]: isNotFetching,
    [registerUsersViaCSVAction.rejected.toString()]: isNotFetching,


    [removeFromTeamAction.pending.toString()]: isFetching,
    [removeFromTeamAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg: { receipt } } }) => {
      const newAllProgramTeams = [...state.allProgramTeams];
      for (let i = 0; i < newAllProgramTeams.length; i++) {
        const team = newAllProgramTeams[i];
        for (let j = 0; j < team.members.length; j++) {
          if (team.members[j].id === receipt) {
            team.members.splice(j, 1);
          }
        }
      }
      state.allProgramTeams = newAllProgramTeams;
      state.isFetching = false;
    },
    [removeFromTeamAction.rejected.toString()]: isNotFetching,
  },
});

export const {
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
} = programSlice.actions;

export const { reducer: programsReducer } = programSlice;
