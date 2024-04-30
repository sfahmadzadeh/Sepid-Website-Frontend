import { createApi } from '@reduxjs/toolkit/query/react'
import { MWS_URL } from 'configs/Constants'
import CustomBaseQuery from './utilities/CustomBaseQuery';

export const ManageWebsiteServiceApi = createApi({
  reducerPath: 'mangage-website-service',
  baseQuery: CustomBaseQuery({ baseUrl: MWS_URL + 'api/' }),
  endpoints: build => ({
  })
})
