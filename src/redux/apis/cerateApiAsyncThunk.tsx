import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import handleError from 'redux/features/utilities/ErrorHandler';
import { toast } from 'react-toastify';

type CreateAsyncThunkApiType =
  (
    typePrefix: string,
    api: any,
    url: Function | string,
    option?: any,
  ) => AsyncThunk<any, any, {}>

export const createAsyncThunkApi: CreateAsyncThunkApiType = (typePrefix, api, url, options) =>
  createAsyncThunk(typePrefix, async (arg, { rejectWithValue, dispatch, getState }) => {
    try {
      const body = options?.bodyCreator?.(arg) || arg;
      const state: any = getState();
      const website = state.website?.website?.name;
      if (body) {
        body['website'] = website;
      }

      let stringUrl = typeof url === 'function' ? url(arg) : url;

      if (arg?.parameters) {
        Object.entries(arg?.parameters).map(entry => {
          stringUrl += `?${entry[0]}=${entry[1]}`
        })
      }

      const response = await api(stringUrl, body);

      // component self onSuccess action
      arg?.onSuccess?.();

      // function self onSuccess action
      if (options?.onSuccessAction) {
        dispatch(options.onSuccessAction({ response, arg, options }));
      }

      if (options?.defaultNotification?.success) {
        toast.success(options.defaultNotification.success)
      }

      return {
        response,
      };
    } catch (error: any) {
      // component self onFailure action
      arg?.onFailure?.();

      if ((getState() as any).Intl.locale == 'fa') {
        handleError({
          error: error.response,
          dispatch,
          errorMessage: options?.defaultNotification?.error,
        });
        return rejectWithValue(null);
      }
    }
  });
