import {
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProgramQuery, useRegisterUserInProgramMutation } from 'apps/website-display/redux/features/program/ProgramSlice';

type RegisterUserInProgramPropsType = {}

const RegisterUserInProgram: FC<RegisterUserInProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const [username, setUsername] = useState<string>('');
  const [_registerUserInProgram, result] = useRegisterUserInProgramMutation();
  const { data: program } = useGetProgramQuery({ programSlug });

  const registerUserInProgram = () => {
    if (!username) {
      toast.error('لطفاً نام کاربری کاربر را وارد کنید.');
      return;
    }
    _registerUserInProgram({
      registrationFormId: program.registration_form,
      username,
    })
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('کاربر با موفقیت به دوره اضافه شد.');
      setUsername('');
    }
  }, [result])

  return (
    <Stack spacing={2}>
      <Typography variant='h2'>
        {'ثبت‌نام کاربر جدید'}
      </Typography>

      <Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={username}
              size="small"
              fullWidth
              variant="outlined"
              label="نام کاربری"
              name="username"
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={!username}
              fullWidth
              variant="contained"
              color="primary"
              onClick={registerUserInProgram}>
              {'ثبت‌نام کاربر جدید'}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default RegisterUserInProgram;
