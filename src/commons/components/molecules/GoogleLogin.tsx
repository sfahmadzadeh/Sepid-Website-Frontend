import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';

import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useGetGoogleUserProfileQuery, useLoginGoogleUserMutation } from 'apps/website-display/redux/features/user/UserSlice';

const GoogleLogin = () => {
  const [googleUser, setGoogleUser] = useState(null);

  const onLoginError = (error) => {
    toast.error('ورود با گوگل به مشکل خورد');
    console.log(error);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: onLoginError,
    flow: 'implicit',
  });

  const {
    data: googleUserProfile,
  } = useGetGoogleUserProfileQuery({ accessToken: googleUser?.access_token }, { skip: !googleUser })

  const [loginWithGoogle, result] = useLoginGoogleUserMutation();

  useEffect(
    () => {
      if (googleUserProfile?.email) {
        loginWithGoogle({
          first_name: googleUserProfile.given_name,
          last_name: googleUserProfile.family_name,
          email: googleUserProfile.email,
        });
      }
    },
    [googleUserProfile]
  )

  return (
    <Button variant='outlined' color='secondary' startIcon={<GoogleIcon color='secondary' />} onClick={() => googleLogin()}>
      {'ورود با گوگل'}
    </Button >
  )
}

export default GoogleLogin;