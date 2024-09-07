import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import RegisterUsersViaExcelInProgram from './RegisterUsersViaExcelInProgram';
import RegisterUserInProgram from './RegisterUserInProgram';
import RegistrationReceiptsTable from 'commons/components/organisms/tables/RegistrationReceipts';
import { useGetFormRespondentsAnswersFileMutation } from 'apps/website-display/redux/features/report/ReportSlice';
import downloadFromURL from 'commons/utils/downloadFromURL';
import { MEDIA_BASE_URL } from 'commons/configs/Constants';
import isValidURL from 'commons/utils/validators/urlValidator';

type RegistrationReceiptsPropsType = {
  registrationFormId: string;
}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({
  registrationFormId,
}) => {

  const [getFormRespondentsAnswersFile, result] = useGetFormRespondentsAnswersFileMutation();

  const downloadExcelExport = () => {
    getFormRespondentsAnswersFile({ formId: registrationFormId })
  }

  useEffect(() => {
    if (result.isSuccess) {
      let url = result.data.file;
      if (!isValidURL(url)) {
        url = `${MEDIA_BASE_URL}${result.data.file}`;
      }
      downloadFromURL(url, `registrants-answers.xlsx`);
    }
  }, [result])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <RegisterUserInProgram />
      </Stack>
      <Divider />

      <Stack padding={2} spacing={2}>
        <RegisterUsersViaExcelInProgram />
      </Stack>
      <Divider />

      <Stack spacing={2}>
        <Stack padding={2} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'شرکت‌کنندگان'}
          </Typography>
          <Button variant='contained' onClick={downloadExcelExport} disabled={result.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
        <RegistrationReceiptsTable registrationFormId={registrationFormId} />
      </Stack>
    </Stack>
  );
}

export default RegistrationReceipts;