import { createApi } from '@reduxjs/toolkit/query/react'
import { MPS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from './utilities/CustomBaseQuery';

export const ManagePartyServiceApi = createApi({
  reducerPath: 'manage-party-service',
  baseQuery: CustomBaseQuery({ baseUrl: MPS_URL + 'api/' }),
  endpoints: build => ({
  })
})
