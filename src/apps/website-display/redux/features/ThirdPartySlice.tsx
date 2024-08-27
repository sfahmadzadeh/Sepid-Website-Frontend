import { ProgramType } from 'commons/types/models';
import { ManageWebsiteServiceApi } from './ManageWebsiteServiceApiSlice';

export const ThirdPartySlice = ManageWebsiteServiceApi.injectEndpoints({
  endpoints: builder => ({
    getThirdParties: builder.query<ProgramType[], { partyName: string | undefined }>({
      query: ({ partyName }) => `third-party/get-third-party/?website=${partyName}`,
    })
  })
});

export const { useGetThirdPartiesQuery } = ThirdPartySlice;
