import {
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import RegisterUsersViaCSV from './RegisterUsersViaCSV';
import RegisterOneUser from './RegisterOneUser';
import AnswerSheetTable from 'components/organisms/tables/AnswerSheet';

type RegistrationReceiptsPropsType = {
  formId: string;
}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({
  formId,
}) => {
  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <RegisterOneUser />
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <RegisterUsersViaCSV />
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography padding={2} variant='h2' gutterBottom>
          {'شرکت‌کنندگان'}
        </Typography>
        <AnswerSheetTable formId={formId} />
      </Stack>
    </Stack>
  );
}

export default RegistrationReceipts;