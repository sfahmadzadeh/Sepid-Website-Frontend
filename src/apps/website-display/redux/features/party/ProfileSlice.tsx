import { SchoolStudentshipType, UserInfoType } from 'commons/types/profile';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { WebsiteType } from 'commons/types/global';
import { MWS_URL } from 'commons/configs/Constants';
import jsonToFormData from 'commons/utils/jsonToFromDate';

type GetUserProfileInputType = {
  userId: string;
}

type UpdateUserProfileInputType = {
  userId: string;
} & Partial<UserInfoType>;

type GetUserProfileOutputType = UserInfoType;

type UpdateSchoolStudentshipInputType = Partial<SchoolStudentshipType>;

type GetSchoolStudentshipOutputType = SchoolStudentshipType;

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
        body,
      }),
    }),

    updateSchoolStudentship: builder.mutation<GetSchoolStudentshipOutputType, UpdateSchoolStudentshipInputType>({
      invalidatesTags: ['user-profile'],
      query: ({ id, ...body }) => ({
        url: `auth/studentship/${id}/`,
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
  useUpdateSchoolStudentshipMutation,
} = ProfileSlice;
