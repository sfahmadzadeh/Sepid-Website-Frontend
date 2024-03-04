import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

type LoginGoogleUserInputType = {
  first_name: string;
  last_name: string;
  email: string;
}

type LoginGoogleUserOutputType = {
  user: any;
  access: string;
  refresh: string;
};

type GetGoogleUserProfileInput = {
  accessToken: string;
}

type GetGoogleUserProfileOutput = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean
}

export const UserSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getGoogleUserProfile: builder.query<GetGoogleUserProfileOutput, GetGoogleUserProfileInput>({
      query: (body) => ({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${body.accessToken}`,
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          Accept: 'application/json'
        }
      })
    }),
    loginGoogleUser: builder.mutation<LoginGoogleUserOutputType, LoginGoogleUserInputType>({
      invalidatesTags: ['programs'],
      query: (body) => ({
        url: 'auth/accounts/login-with-google/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): LoginGoogleUserOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetGoogleUserProfileQuery,
  useLoginGoogleUserMutation,
} = UserSlice;
