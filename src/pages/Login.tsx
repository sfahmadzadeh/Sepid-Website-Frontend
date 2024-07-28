import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from 'components/molecules/GoogleLogin';
import { useLoginMutation } from 'redux/features/user/UserSlice';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import WebsiteLogo from 'components/atoms/logos/WebsiteLogo';

type LoginPagePropsType = {
  isFetching: boolean;
  accessToken: string;
};

const LoginPage: FC<LoginPagePropsType> = ({
  isFetching,
  accessToken,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const { data: website } = useGetWebsiteQuery();
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (accessToken) {
      const previousLocation = location.state?.from?.pathname
      const destinationLocation = previousLocation || '/programs/';
      navigate(destinationLocation, { replace: true });
    }
  }, [accessToken])

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const regularLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Stack
        spacing={5}
        alignItems={'center'}
        width={400}>

        <Box pb={2}>
          <WebsiteLogo size='large' />
        </Box>

        <Stack
          width={'100%'}
          component={Paper}
          spacing={4}
          padding={2}
          alignItems={'center'}>

          <Typography
            paddingBottom={2}
            component="h1"
            variant="h3"
            textAlign={'center'}>
            {'ورود به سامانه'}
          </Typography>

          <Stack width={'100%'} spacing={2.5}>
            <Stack
              width={'100%'}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  regularLogin();
                }
              }}
              spacing={1.5}>

              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={putData}
                value={data.username}
                name="username"
                label="شماره تلفن همراه، ایمیل یا نام کاربری"
                inputProps={{ className: 'ltr-input' }}
                type='text'
                inputMode='text'
              />

              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={putData}
                label="گذرواژه"
                name="password"
                inputProps={{ className: 'ltr-input' }}
                type="password"
                inputMode='text'
                helperText={
                  <Typography align='right' mt={0.5}>
                    <Link to={'/reset-password'}>
                      {'فراموشی گذرواژه'}
                    </Link>
                  </Typography>
                }
              />
            </Stack>
            <Stack width={'100%'} spacing={1.5}>
              <Button
                onClick={regularLogin}
                variant="contained"
                color="primary"
                disabled={isFetching}
                fullWidth>
                بزن بریم
              </Button>
              {website?.has_login_with_google &&
                <GoogleLogin />
              }
            </Stack>
          </Stack>

          <Typography align='center'>
            {'حساب کاربری ندارید؟ '}
            <Link style={{ marginRight: 4, fontWeight: 800, color: '#1361A4' }} to={'/create-account'}>
              {'ثبت‌نام'}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
})(LoginPage);
