import { createSlice } from '@reduxjs/toolkit';
import { Apis } from 'redux/apis';
import { createAsyncThunkApi } from 'redux/apis/cerateApiAsyncThunk';
import {
  clearWidgetAnswerUrl,
  sendWidgetAnswerUrl,
  uploadFileUrl,
} from 'redux/constants/urls';

export type InitialStateType = {
  isFetching: boolean;
  answers: object;
}

const initialState: InitialStateType = {
  answers: {},
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

/////////////////////////// SEND ANSWER ///////////////////////////

const _sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text, onSuccess }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'BigAnswer',
    onSuccess,
  });

export const sendSmallAnswerAction = ({ widgetId, text, onSuccess }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'SmallAnswer',
    onSuccess,
  });

export const sendInviteeUsernameResponseAction = ({ widgetId, username, onSuccess }) =>
  _sendWidgetAnswerAction({
    widgetId,
    username,
    answer_type: 'InviteeUsernameResponse',
    onSuccess,
  });

export const sendMultiChoiceAnswerAction = ({ problemId, selectedChoices, onSuccess }) =>
  _sendWidgetAnswerAction({
    widgetId: problemId,
    choices: selectedChoices,
    answer_type: 'MultiChoiceAnswer',
    onSuccess,
  });


export const uploadFileAnswerAction = createAsyncThunkApi(
  'widget/uploadFileAnswerAction',
  Apis.POST_FORM_DATA,
  uploadFileUrl,
  {
    bodyCreator: ({ problemId, answerFile, onSuccess }) => ({
      problem: problemId,
      answer_file: answerFile,
      is_final_answer: true,
      onSuccess,
    }),
    defaultNotification: {
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const clearWidgetAnswerAction = createAsyncThunkApi(
  'widget/clearWidgetAnswerAction',
  Apis.GET,
  clearWidgetAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);

const AnswerSlice = createSlice({
  name: 'AnswerSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [_sendWidgetAnswerAction.pending.toString()]: isFetching,
    [_sendWidgetAnswerAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.isFetching = false;
    },
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,


    [uploadFileAnswerAction.pending.toString()]: isFetching,
    [uploadFileAnswerAction.fulfilled.toString()]: isNotFetching,
    [uploadFileAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: AnswerReducer } = AnswerSlice;
