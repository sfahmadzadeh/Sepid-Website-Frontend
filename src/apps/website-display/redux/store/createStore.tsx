import { configureStore } from '@reduxjs/toolkit';
import { ManagePartyServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ManageContentServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { ManageWebsiteServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'
import rootReducer from 'apps/website-display/redux/rootReducer';

const createStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(ManagePartyServiceApi.middleware)
        .concat(ManageContentServiceApi.middleware)
        .concat(ManageWebsiteServiceApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
