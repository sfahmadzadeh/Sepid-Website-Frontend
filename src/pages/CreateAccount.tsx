import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  createAccountAction,
} from 'redux/slices/account';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import appendPreviousParams from 'utils/AppendPreviousParams';
import { toast } from 'react-toastify';
import VerifyPhoneNumber from 'components/molecules/VerifyPhoneNumber';

type CreateAccountPropsType = {
  isFetching: boolean;
  createAccount: any;
  accessToken: string;
}

const CreateAccount: FC<CreateAccountPropsType> = ({
  isFetching,
  createAccount,
  accessToken,
}) => {
  const navigate = useNavigate();
  const [data, _setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    verificationCode: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const programId = urlParams.get('private_program_id');

  useEffect(() => {
    if (accessToken) {
      if (programId) {
        navigate(`/program/${programId}/`);
      } else {
        navigate('/programs/');
      }
    }
  }, [programId, navigate, accessToken])

  const setData = (event) => {
    _setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreatingAccount = () => {
    const { phoneNumber, password, confirmationPassword, firstName, lastName } = data;
    if (!phoneNumber || !password || !confirmationPassword || !firstName || !lastName) {
      toast.error('همه‌ی موارد خواسته شده را پر کن');
      return;
    }

    if (password !== confirmationPassword) {
      toast.error('رمزهای وارد شده مشابه نیستند');
      return;
    }
    createAccount(data);
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
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleCreatingAccount();
          }
        }}
        width={400} component={Paper} sx={{ padding: 2 }} spacing={1.5}>

        <Typography gutterBottom variant='h2' align='center'>{'ایجاد حساب کاربری'}</Typography>

        <TextField
          variant="outlined"
          fullWidth
          onChange={setData}
          value={data.firstName}
          name="firstName"
          label="نام"
          type='text'
          inputMode='text'
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={setData}
          value={data.lastName}
          name="lastName"
          label="نام خانوادگی"
          type='text'
          inputMode='text'
        />

        <VerifyPhoneNumber
          data={{
            phoneNumber: data.phoneNumber,
            verificationCode: data.verificationCode
          }}
          setData={setData}
          verifyType='on-create-user-account'
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={setData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
          inputMode='text'
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={setData}
          label="تکرار گذرواژه"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
          type="password"
          inputMode='text'
        />

        <Button
          onClick={handleCreatingAccount}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          ثبت
        </Button>

        <Typography align="center">
          <Link style={{ textDecoration: 'none' }} to={appendPreviousParams("/login")}>
            {'از قبل حساب کاربری داشتم...'}
          </Link>
        </Typography>
      </Stack>
    </Container >
  )
}

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
})(CreateAccount);
