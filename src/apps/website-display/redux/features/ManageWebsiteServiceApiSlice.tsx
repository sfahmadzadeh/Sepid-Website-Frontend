import { createApi } from '@reduxjs/toolkit/query/react'
import { MWS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from './utilities/CustomBaseQuery';

export const ManageWebsiteServiceApi = createApi({
  reducerPath: 'manage-website-service',
  tagTypes:[
    'website',
  ],
  baseQuery: CustomBaseQuery({ baseUrl: MWS_URL + 'api/' }),
  endpoints: build => ({
  })
})
