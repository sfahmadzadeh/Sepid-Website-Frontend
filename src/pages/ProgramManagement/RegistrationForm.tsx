import React, { FC } from 'react';
import { EditPaper } from 'components/template/Paper';
import { Divider, Stack, Typography } from '@mui/material';
import { useGetFormQuery } from 'redux/features/form/FormSlice';

type RegistrationFormPropsType = {
  registrationFormId: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationFormId,
}) => {

  const { data: registrationForm } = useGetFormQuery({ formId: registrationFormId });

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'تنظیمات ثبت‌نام'}
        </Typography>
        {/* دکمه‌های سوالات متداول + راهنمای سایت + اپ‌بار و هدر و اوپن‌گراف سایت */}
        <Typography>
          {'todo'}
        </Typography>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'فرم ثبت‌نام'}
        </Typography>
        <EditPaper paperId={registrationFormId} />
      </Stack>
    </Stack>
  );
};

export default RegistrationForm;