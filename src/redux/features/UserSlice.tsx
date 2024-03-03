import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

type LoginGoogleUserInputType = {
  first_name: string;
  last_name: string;
  email: string;
}

type LoginGoogleUserOutputType = {
  user: any;
  access_token: string;
  refresh_token: string;
};

type GetGoogleUserProfileInput = {
  access_token: string;
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
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${body.access_token}`,
        headers: {
          Authorization: `Bearer ${body.access_token}`,
          Accept: 'application/json'
        }
      })
    }),
    loginGoogleUser: builder.mutation<LoginGoogleUserOutputType, LoginGoogleUserInputType>({
      query: (body) => ({
        url: 'auth/accounts/login-with-google/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): LoginGoogleUserOutputType => {
        return {
          user: response.user,
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        };
      },
    }),
  })
});

export const {
  useGetGoogleUserProfileQuery,
  useLoginGoogleUserMutation,
} = UserSlice;
