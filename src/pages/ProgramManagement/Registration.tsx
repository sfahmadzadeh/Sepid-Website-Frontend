import React, { FC } from 'react';
import { EditPaper } from 'components/template/Paper';
import { Divider, Stack, Typography } from '@mui/material';

type RegistrationPropsType = {
  formId: any;
}

const Registration: FC<RegistrationPropsType> = ({
  formId,
}) => {

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
        <EditPaper paperId={formId} />
      </Stack>
    </Stack>
  );
};

export default Registration;