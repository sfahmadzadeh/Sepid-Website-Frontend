import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MPS_URL } from 'configs/Constants'
import { logoutAction } from 'redux/slices/account';

const _managePartyServiceBaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: MPS_URL + 'api/',
  })(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401 || result.error.status === 403) {
      // Handle 403 error
      // For example, you can dispatch a logout action
      api.dispatch(logoutAction());
    }
    // Handle other types of errors
  }
  return result;
};

export const ManagePartyServiceApi = createApi({
  reducerPath: 'mangage-party-service',
  baseQuery: _managePartyServiceBaseQuery,
  endpoints: build => ({
  })
})
