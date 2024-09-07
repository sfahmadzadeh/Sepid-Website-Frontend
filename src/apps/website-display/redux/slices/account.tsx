import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  accountCRUDUrl,
  changePasswordUrl,
  verificationCodeUrl,
} from '../constants/urls';
import { UserSlice } from 'apps/website-display/redux/features/user/UserSlice';


export const getVerificationCodeAction = createAsyncThunkApi(
  'account/getVerificationCode',
  Apis.POST,
  verificationCodeUrl,
  {
    bodyCreator: ({ phoneNumber, codeType, partyDisplayName }) => ({
      phone_number: phoneNumber,
      code_type: codeType,
      party_display_name: partyDisplayName,
    }),
    defaultNotification: {
      success: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود.',
      error: 'مشکلی وجود دارد. چند لحظه دیگر دوباره تلاش کن!',
    },
  }
);


export const changePasswordAction = createAsyncThunkApi(
  'account/changePasswordAction',
  Apis.POST,
  changePasswordUrl,
  {
    bodyCreator: ({ phoneNumber, password, code, onSuccess }) => ({
      phone_number: phoneNumber,
      password,
      code,
      onSuccess,
    }),
    defaultNotification: {
      success: 'گذرواژه با موفقیت تغییر یافت!',
      error: 'مشکلی وجود دارد، رمز تغییر نکرد.',
    },
  }
);

////////////////


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const initialState = {
  // userInfo includes both user account information + user profile information
  id: null,
  userInfo: null,
  institutes: [],
  isFetching: false,
  accessToken: '',
  refreshToken: '',
  user: {},
  discountCodes: [],
  newlyAddedInstitute: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
    refreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.location.reload();
    },
  },

  extraReducers: (builder) => {

    builder.addMatcher(
      UserSlice.endpoints.createAccount.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        state.isFetching = false;
      }
    );

    builder.addMatcher(
      UserSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        state.isFetching = false;
      }
    );

    builder.addMatcher(
      UserSlice.endpoints.loginGoogleUser.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        state.isFetching = false;
      }
    )

    builder.addMatcher(
      UserSlice.endpoints.changePhoneNumber.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = { ...state.userInfo, ...payload };
        state.isFetching = false;
      }
    )

    ///////////// LOADINGS /////////////

    builder.addMatcher(
      isAnyOf(
        changePasswordAction.pending,
        UserSlice.endpoints.createAccount.matchPending,
        UserSlice.endpoints.login.matchPending,
        UserSlice.endpoints.getGoogleUserProfile.matchPending,
        UserSlice.endpoints.loginGoogleUser.matchPending,
        UserSlice.endpoints.changePhoneNumber.matchPending,
      ),
      isFetching,
    );

    builder.addMatcher(
      isAnyOf(
        changePasswordAction.fulfilled,
        changePasswordAction.rejected,
        UserSlice.endpoints.createAccount.matchRejected,
        UserSlice.endpoints.login.matchRejected,
        UserSlice.endpoints.getGoogleUserProfile.matchRejected,
        UserSlice.endpoints.loginGoogleUser.matchRejected,
        UserSlice.endpoints.changePhoneNumber.matchRejected,
      ),
      isNotFetching,
    );
  }
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
