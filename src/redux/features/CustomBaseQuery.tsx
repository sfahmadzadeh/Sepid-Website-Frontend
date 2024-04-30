import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const CustomBaseQuery = ({ baseUrl }) =>
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = (getState() as any).account?.accessToken;
        //todo: what should we do with refresh token?!
        const refreshToken = (getState() as any).account?.refreshToken;
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`)
        }
        return headers
      },
    })(args, api, extraOptions);

    if (result.error) {
      console.log(result.error)
      if (result.error.status === 401 || result.error.status === 403) {
        // Handle 403 error
        // For example, you can dispatch a logout action
        api.dispatch('account/logout');
      }
      // Handle other types of errors
    }
    return result;
  };

export default CustomBaseQuery;
