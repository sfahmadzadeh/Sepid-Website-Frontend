import { UserInfoType } from 'types/profile';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetPartyProfileInputType = {
  partyId: string;
}

type GetPartyProfileOutputType = Partial<UserInfoType>;

export const ProfileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getPartyProfile: builder.query<GetPartyProfileOutputType, GetPartyProfileInputType>({
      query: ({ partyId }) => ({
        url: `auth/profile/${partyId}/`,
        method: 'GET',
      }),
    }),

    getPartyProfileSummary: builder.query<GetPartyProfileOutputType, GetPartyProfileInputType>({
      query: ({ partyId }) => ({
        url: `auth/profile/${partyId}/profile_summary/`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useGetPartyProfileQuery,
  useGetPartyProfileSummaryQuery
} = ProfileSlice;
