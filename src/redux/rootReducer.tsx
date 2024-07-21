import { combineReducers } from '@reduxjs/toolkit';
import allReducers from './slices/allReducers';
import { ManagePartyServiceApi } from 'redux/features/ManagePartyServiceApiSlice'
import { ManageContentServiceApi } from 'redux/features/ManageContentServiceApiSlice'
import { ManageWebsiteServiceApi } from 'redux/features/ManageWebsiteServiceApiSlice'
import { logoutAction } from './slices/account';


const appReducer = combineReducers({
  ...allReducers,
  [ManagePartyServiceApi.reducerPath]: ManagePartyServiceApi.reducer,
  [ManageContentServiceApi.reducerPath]: ManageContentServiceApi.reducer,
  [ManageWebsiteServiceApi.reducerPath]: ManageWebsiteServiceApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutAction.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
