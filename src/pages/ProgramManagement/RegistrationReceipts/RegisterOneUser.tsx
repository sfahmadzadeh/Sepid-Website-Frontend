import {
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import React, { useState, FC } from 'react';
import { toast } from 'react-toastify';

type AddOneUserPropsType = {}

const RegisterOneUser: FC<AddOneUserPropsType> = ({ }) => {
  const [username, setUsername] = useState<string>('');


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
              onClick={() => toast.info('این فیچر در دست پیاده‌سازی است!')}>
              {'ثبت‌نام کاربر جدید'}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default RegisterOneUser;
