import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import handleError from './ErrorHandler';

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

    args.body?.onSuccess?.();

    if (result.error) {
      args.body?.onFailure?.();
      handleError({ error: result.error, dispatch: api.dispatch })
    }
    return result;
  };

export default CustomBaseQuery;
