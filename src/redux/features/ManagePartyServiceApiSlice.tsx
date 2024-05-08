import { createApi } from '@reduxjs/toolkit/query/react'
import { MPS_URL } from 'configs/Constants'
import CustomBaseQuery from './utilities/CustomBaseQuery';

export const ManagePartyServiceApi = createApi({
  reducerPath: 'mangage-party-service',
  baseQuery: CustomBaseQuery({ baseUrl: MPS_URL + 'api/' }),
  endpoints: build => ({
  })
})
