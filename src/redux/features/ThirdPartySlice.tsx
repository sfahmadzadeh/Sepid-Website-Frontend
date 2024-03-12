import { ProgramType } from 'types/models';
import { ManagePartyServiceApi } from './ManagePartyServiceApiSlice';

export const ThirdPartySlice = ManagePartyServiceApi.injectEndpoints({
  endpoints: builder => ({
    getThirdParties: builder.query<ProgramType[], { partyUuid: string | undefined }>({
      query: ({ partyUuid }) => `third-party/get-third-party/?party=${partyUuid}`,
    })
  })
});

export const { useGetThirdPartiesQuery } = ThirdPartySlice;
