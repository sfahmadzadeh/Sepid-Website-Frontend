import {
  createSelector,
} from '@reduxjs/toolkit';
import { PartyType, PageType } from 'types/global';
import { ManagePartyServiceApi } from './ManagePartyServiceApiSlice'

export const PartySlice = ManagePartyServiceApi.injectEndpoints({
  endpoints: builder => ({
    getParty: builder.query<PartyType, void>({
      query: () => `party/get-party/`,
    }),
    getPageMetadata: builder.query<PageType, { partyUuid: string, pageAddress: string }>({
      query: ({ partyUuid, pageAddress }) => `site-appearance/get-page-metadata/?party=${partyUuid}&page_address=${pageAddress}`,
    })
  })
})

export const selectPartyUUID = createSelector(
  PartySlice.endpoints.getParty.select(),
  reponse => reponse.data?.uuid,
)

export const {
  useGetPartyQuery,
  useGetPageMetadataQuery,
} = PartySlice;
