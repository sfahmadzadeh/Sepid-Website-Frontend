import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MPS_URL } from 'configs/Constants'


export const ManagePartyServiceApi = createApi({
  reducerPath: 'mangage-party-service',
  baseQuery: fetchBaseQuery({
    baseUrl: MPS_URL,
  }),
  endpoints: build => ({
  })
})
