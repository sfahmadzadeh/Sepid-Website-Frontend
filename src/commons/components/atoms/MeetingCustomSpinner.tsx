import { Stack } from '@mui/material';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type MeetingCustomSpinnerPropsType = {}

const MeetingCustomSpinner: FC<MeetingCustomSpinnerPropsType> = ({ }) => {
  return (
    <Stack sx={{ height: '100%', width: '100%', backgroundColor: 'white' }} alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Stack>
  );
}

export default MeetingCustomSpinner;