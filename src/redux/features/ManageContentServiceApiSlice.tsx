import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from './utilities/CustomBaseQuery';
import { MCS_URL } from 'configs/Constants';

export const ManageContentServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes: [
    'program',
    'programs',
    'fsm',
    'fsms',
    'program-admins',
    'fsm-states',
    'fsm-state',
    'fsm-edges',
    'fsm-edge',
    'widget',
    'paper',
    'articles',
    'article',
    'form',
    'forms',
  ],
  baseQuery: CustomBaseQuery({ baseUrl: MCS_URL + 'api/' }),
  endpoints: build => ({
  })
})
