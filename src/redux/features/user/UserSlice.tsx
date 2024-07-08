import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

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

type ChangePhoneNumberInput = {
  phone_number: string;
  code: string;
}

type LoginInput = {
  username: string;
  password: string;
}

type LoginOutputType = {
  access: string;
  refresh: string;
  account: any;
}

export const UserSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    checkAuthentication: builder.query<void, void>({
      query: () => ({
        url: 'auth/accounts/check-authentication/',
        method: 'GET',
      }),
    }),

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
      // todo: this invalidation should be deleted (after separating permission and programs)
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

    changePhoneNumber: builder.mutation<any, ChangePhoneNumberInput>({
      query: (body) => ({
        url: 'auth/accounts/change-phone-number/',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginOutputType, LoginInput>({
      // todo: this invalidation should be deleted (after separating permission and programs)
      invalidatesTags: ['programs'],
      query: (body) => ({
        url: 'auth/accounts/login/',
        method: 'POST',
        body,
      }),
    })
  })
});

export const {
  useCheckAuthenticationQuery,
  useGetGoogleUserProfileQuery,
  useLoginGoogleUserMutation,
  useChangePhoneNumberMutation,
  useLoginMutation,
} = UserSlice;
