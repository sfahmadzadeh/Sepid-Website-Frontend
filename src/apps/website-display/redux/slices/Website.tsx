import { createSlice } from '@reduxjs/toolkit';
import { WebsiteSlice } from 'apps/website-display/redux/features/WebsiteSlice';
import { WebsiteType } from 'commons/types/global';

type WebsiteSliceInitialStateType = {
  website: WebsiteType;
};

const initialState: WebsiteSliceInitialStateType = {
  website: null,
};

const Slice = createSlice({
  name: 'website',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addMatcher(
      WebsiteSlice.endpoints.getWebsite.matchFulfilled,
      (state, { payload }) => {
        state.website = payload;
      }
    );

  },
});

export const { reducer: WebsiteReducer } = Slice;
