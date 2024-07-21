import { configureStore } from '@reduxjs/toolkit';
import { ManagePartyServiceApi } from 'redux/features/ManagePartyServiceApiSlice'
import { ManageContentServiceApi } from 'redux/features/ManageContentServiceApiSlice'
import { ManageWebsiteServiceApi } from 'redux/features/ManageWebsiteServiceApiSlice'
import rootReducer from 'redux/rootReducer';

const createStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
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
