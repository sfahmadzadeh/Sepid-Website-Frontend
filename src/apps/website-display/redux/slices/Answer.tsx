import { createSlice } from '@reduxjs/toolkit';
import { Apis } from 'apps/website-display/redux/apis';
import { createAsyncThunkApi } from 'apps/website-display/redux/apis/cerateApiAsyncThunk';
import {
  clearQuestionAnswerUrl,
  sendWidgetAnswerUrl,
} from 'apps/website-display/redux/constants/urls';

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

export const sendBigAnswerAction = ({ questionId, text, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    text,
    answer_type: 'BigAnswer',
    onSuccess,
    onFailure,
  });

export const sendSmallAnswerAction = ({ questionId, text, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    text,
    answer_type: 'SmallAnswer',
    onSuccess,
    onFailure,
  });

export const sendInviteeUsernameResponseAction = ({ questionId, username, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    username,
    answer_type: 'InviteeUsernameResponse',
    onSuccess,
    onFailure,
  });

export const sendMultiChoiceAnswerAction = ({ questionId, selectedChoices, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    choices: selectedChoices,
    answer_type: 'MultiChoiceAnswer',
    onSuccess,
    onFailure,
  });

export const sendUploadFileAnswerAction = ({ questionId, answerFile, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    answer_file: answerFile,
    answer_type: 'UploadFileAnswer',
    onSuccess,
    onFailure,
  });

export const clearQuestionAnswerAction = createAsyncThunkApi(
  'widget/clearQuestionAnswerAction',
  Apis.POST,
  clearQuestionAnswerUrl,
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
    [_sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: AnswerReducer } = AnswerSlice;
