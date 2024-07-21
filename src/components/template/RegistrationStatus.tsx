import { Paper, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

type RegistrationStatusPropsType = {

}

const RegistrationStatus: FC<RegistrationStatusPropsType> = ({

}) => {
  const { programId } = useParams();
  const { data: program } = useGetProgramQuery({ programId });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });

  return (
    <Stack spacing={4}>
      <Typography align="center"
        sx={{
          fontSize: 40,
          fontWeight: 600,
          textShadow: '1px 1px #dbd9d9',
        }}>
        {'وضعیت ثبت‌نام'}
      </Typography>
      <Stack component={Paper} padding={2} spacing={2}>
        {registrationReceipt.status == 'Waiting' && (
          <Typography align="center">
            {'شما فرم‌ثبت‌نام در این دوره را پر کرده‌اید! منتظر نتیجه‌ی بررسی از جانب ما باشید.'}
          </Typography>
        )}
        {registrationReceipt.status == 'Rejected' && (
          <Typography align="center">
            {'متاسفانه شما برای شرکت در این دوره پذیرفته‌نشده‌اید :('}
          </Typography>
        )}
      </Stack>
    </Stack >
  );
};



export default RegistrationStatus;
