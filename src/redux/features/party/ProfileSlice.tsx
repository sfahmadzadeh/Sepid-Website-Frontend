import { UserInfoType } from 'types/profile';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { WebsiteType } from 'types/global';
import { MWS_URL } from 'configs/Constants';

type GetUserProfileInputType = {
  partyId: string;
}

type GetUserProfileOutputType = Partial<UserInfoType>;

type GetWebsiteProfileInputType = {}

type GetWebsiteProfileOutputType = Partial<WebsiteType>;

export const ProfileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<GetUserProfileOutputType, GetUserProfileInputType>({
      query: ({ partyId }) => ({
        url: `auth/profile/${partyId}/`,
        method: 'GET',
      }),
    }),

    getUserProfileSummary: builder.query<GetUserProfileOutputType, GetUserProfileInputType>({
      query: ({ partyId }) => ({
        url: `auth/profile/${partyId}/profile_summary/`,
        method: 'GET',
      }),
    }),

    getWebsiteProfileSummary: builder.query<GetWebsiteProfileOutputType, GetWebsiteProfileInputType>({
      query: ({ }) => {
        return ({
          // todo: get website profile summary
          url: `${MWS_URL}api/website/get-website/`,
          method: 'GET',
        })
      },
    }),
  })
});

export const {
  useGetUserProfileQuery,
  useGetUserProfileSummaryQuery,
  useGetWebsiteProfileSummaryQuery,
} = ProfileSlice;
