import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import RegisterUsersViaCSV from './RegisterUsersViaCSV';
import RegisterOneUser from './RegisterOneUser';
import AnswerSheetTable from 'components/organisms/tables/AnswerSheet';
import { useGetRegistrationFormAnswersMutation } from 'redux/features/report/ReportSlice';
import downloadFromURL from 'utils/downloadFromURL';
import { MEDIA_BASE_URL } from 'configs/Constants';

type RegistrationReceiptsPropsType = {
  formId: string;
}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({
  formId,
}) => {

  const [getRegistrationFormAnswers, result] = useGetRegistrationFormAnswersMutation();

  const downloadCSVExport = () => {
    getRegistrationFormAnswers({ formId })
  }

  useEffect(() => {
    if (result.isSuccess) {
      downloadFromURL(`${MEDIA_BASE_URL}${result.data.file}`, `registrants-answers.xlsx`);
    }
  }, [result])

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
        <Stack padding={2} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'شرکت‌کنندگان'}
          </Typography>
          <Button variant='contained' onClick={downloadCSVExport} disabled={result.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
        <AnswerSheetTable formId={formId} />
      </Stack>
    </Stack>
  );
}

export default RegistrationReceipts;