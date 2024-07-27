import { Button, TextField, Container, Paper, Typography, Stack, Box } from '@mui/material';
import WebsiteLogo from 'components/atoms/logos/WebsiteLogo';
import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';

import {
  changePasswordAction,
  getVerificationCodeAction,
} from 'redux/slices/account';
import isNumber from 'utils/validators/isNumber';

type ResetPasswordPropsType = {
  isFetching: boolean;
  getVerificationCode: any;
  changePassword: any;
}

const ResetPassword: FC<ResetPasswordPropsType> = ({
  isFetching,
  getVerificationCode,
  changePassword,
}) => {
  const [buttonText, setButtonText] = useState('دریافت کد');
  const [data, setData] = useState({
    password: '',
    confirmationPassword: '',
    phoneNumber: '',
    code: '',
  });
  const { data: website } = useGetWebsiteQuery();

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const isPhoneNumberValid = (phoneNumber) => {
    var regex = new RegExp('^09\\d{9}$');
    if (regex.test(phoneNumber)) {
      return phoneNumber;
    } else {
      return;
    }
  };

  const doGetVerificationCode = () => {
    if (!data.phoneNumber) {
      toast.error('شماره تلفنی را وارد کن!');
      return;
    }

    if (!isPhoneNumberValid(data.phoneNumber)) {
      toast.error('شماره تلفنت معتبر نیست');
      return;
    }

    setButtonText('۱ دقیقه صبر کن');
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      partyDisplayName: website.display_name,
      codeType: 'change-user-password',
    }).then(() => {
      setTimeout(
        () => {
          setButtonText('دریافت کد');
        },
        process.env.NODE_ENV === 'production' ? 60000 : 1000
      );
    });
  };

  const doChangePassword = () => {
    const { phoneNumber, password, confirmationPassword } = data;
    if (!phoneNumber || !password) {
      toast.error('لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن');
      return;
    }

    if (password !== confirmationPassword) {
      toast.error('رمزهایی که وارد کردی مشابه هم نیستند');
      return;
    }
    changePassword(data);
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
        spacing={4}
        alignItems={'center'}
        width={400}>

        <Box pb={2}>
          <WebsiteLogo size='large' />
        </Box>

        <Stack
          width={'100%'}
          component={Paper}
          spacing={2}
          padding={2}
          alignItems={'center'}>

          <Stack width={'100%'} spacing={1.5}>

            <Typography
              paddingBottom={2}
              component='h1' variant='h3' align='center'>
              {'بازنشانی رمز عبور'}
            </Typography>

            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                if (isNumber(e.target.value)) {
                  putData(e);
                }
              }}
              value={data.phoneNumber}
              name="phoneNumber"
              label="شماره تلفن همراه"
              placeholder='09...'
              inputProps={{ className: 'ltr-input' }}
              type="tel"
              inputMode='tel'
            />

            <Stack
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  doChangePassword();
                }
              }}
              direction='row'
              alignItems='stretch'
              justifyContent='space-between'
              spacing={1}>
              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  if (isNumber(e.target.value)) {
                    putData(e);
                  }
                }}
                value={data.code}
                name="code"
                inputProps={{ className: 'ltr-input' }}
                label="کد تایید پیامک‌شده"
                type='number'
                inputMode='numeric'
              />
              <Button
                sx={{
                  width: '40%',
                  whiteSpace: 'nowrap',
                }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={doGetVerificationCode}
                disabled={buttonText !== 'دریافت کد'}>
                {buttonText}
              </Button>
            </Stack>

            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={putData}
              label="رمز عبور جدید"
              name="password"
              inputProps={{ className: 'ltr-input' }}
              type="password"
              inputMode='text'
            />

            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={putData}
              label="تکرار رمز عبور جدید"
              inputProps={{ className: 'ltr-input' }}
              name="confirmationPassword"
              type="password"
              inputMode='text'
            />

            <Button
              onClick={doChangePassword}
              variant="contained"
              color="primary"
              disabled={isFetching}
              fullWidth>
              تغییر
            </Button>

            <Typography align="center">
              <Link style={{ textDecoration: 'none' }} to={'/login'}>
                {'می‌خواهم وارد حسابم شوم...'}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  getVerificationCode: getVerificationCodeAction,
  changePassword: changePasswordAction,
})(ResetPassword);
