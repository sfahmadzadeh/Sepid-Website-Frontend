import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { ManagePartyServiceApi } from 'redux/features/ManagePartyServiceApiSlice'
import { ManageContentServiceApi } from 'redux/features/ManageContentServiceApiSlice'
import { ManageWebsiteServiceApi } from 'redux/features/ManageWebsiteServiceApiSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [ManagePartyServiceApi.reducerPath]: ManagePartyServiceApi.reducer,
      [ManageContentServiceApi.reducerPath]: ManageContentServiceApi.reducer,
      [ManageWebsiteServiceApi.reducerPath]: ManageWebsiteServiceApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(ManagePartyServiceApi.middleware)
        .concat(ManageContentServiceApi.middleware)
        .concat(ManageWebsiteServiceApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
