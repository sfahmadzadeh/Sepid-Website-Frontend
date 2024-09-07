import { ProgramType } from 'commons/types/models';
import { ManageWebsiteServiceApi } from './ManageWebsiteServiceApiSlice';

export const ThirdPartySlice = ManageWebsiteServiceApi.injectEndpoints({
  endpoints: builder => ({
    getThirdParties: builder.query<ProgramType[], void>({
      query: () => `third-party/get-third-party/`,
    })
  })
});

export const { useGetThirdPartiesQuery } = ThirdPartySlice;
