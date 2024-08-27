import { combineReducers } from '@reduxjs/toolkit';
import allReducers from './slices/allReducers';
import { ManagePartyServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ManageContentServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { ManageWebsiteServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'

const appReducer = combineReducers({
  ...allReducers,
  [ManagePartyServiceApi.reducerPath]: ManagePartyServiceApi.reducer,
  [ManageContentServiceApi.reducerPath]: ManageContentServiceApi.reducer,
  [ManageWebsiteServiceApi.reducerPath]: ManageWebsiteServiceApi.reducer,
});

export default appReducer;
