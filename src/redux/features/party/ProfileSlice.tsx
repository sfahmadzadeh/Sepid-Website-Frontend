import { SchoolStudentshipType, UserInfoType } from 'types/profile';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { WebsiteType } from 'types/global';
import { MWS_URL } from 'configs/Constants';
import jsonToFormData from 'utils/jsonToFromDate';

type GetUserProfileInputType = {
  userId: string;
}

type UpdateUserProfileInputType = {
  userId: string;
} & Partial<UserInfoType>;

type GetUserProfileOutputType = UserInfoType;

type UpdateUserStudentshipInputType = {
  userStudentshipId: string;
} & Partial<SchoolStudentshipType>;

type GetUserStudentshipOutputType = SchoolStudentshipType;

type GetWebsiteProfileInputType = {}

type GetWebsiteProfileOutputType = Partial<WebsiteType>;

export const ProfileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<GetUserProfileOutputType, GetUserProfileInputType>({
      providesTags: ['user-profile'],
      query: ({ userId }) => ({
        url: `auth/profile/${userId}/`,
        method: 'GET',
      }),
    }),

    updateUserProfile: builder.mutation<GetUserProfileOutputType, UpdateUserProfileInputType>({
      invalidatesTags: ['user-profile'],
      query: ({ userId, ...body }) => ({
        url: `auth/profile/${userId}/`,
        method: 'PATCH',
        // todo: remove jsonToFormData. instead, make profile_pic type to URLField
        body: jsonToFormData(body),
      }),
    }),

    updateUserStudentship: builder.mutation<GetUserStudentshipOutputType, UpdateUserStudentshipInputType>({
      invalidatesTags: ['user-profile'],
      query: ({ userStudentshipId, ...body }) => ({
        url: `auth/studentship/${userStudentshipId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    getUserProfileSummary: builder.query<GetUserProfileOutputType, GetUserProfileInputType>({
      providesTags: ['user-profile'],
      query: ({ userId: partyId }) => ({
        url: `auth/profile/${partyId}/profile_summary/`,
        method: 'GET',
      }),
    }),

    getWebsiteProfileSummary: builder.query<GetWebsiteProfileOutputType, GetWebsiteProfileInputType>({
      providesTags: ['website-profile'],
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
  useUpdateUserProfileMutation,
  useUpdateUserStudentshipMutation,
} = ProfileSlice;
