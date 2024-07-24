import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import {
  validateRegistrationReceiptAction,
} from 'redux/slices/programs'
import { faSeri } from '../utils/translateNumber';
import Layout from 'components/template/Layout';
import { toast } from 'react-toastify';
import { RegistrationReceiptType } from 'types/models';
import { useGetReceiptQuery } from 'redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'redux/features/form/FormSlice';
import AnswerSheet from 'components/template/AnswerSheet';

type RegistrationReceiptPropsType = {
  validateRegistrationReceipt: any;
  registrationReceipt: RegistrationReceiptType;
}

const RegistrationReceipt: FC<RegistrationReceiptPropsType> = ({
  validateRegistrationReceipt,
}) => {
  const t = useTranslate();
  const { receiptId } = useParams();
  const [status, setStatus] = useState<string>(null);
  const { data: registrationReceipt } = useGetReceiptQuery({ receiptId });

  useEffect(() => {
    if (registrationReceipt?.status) {
      setStatus(registrationReceipt.status);
    }
  }, [registrationReceipt])

  const userInfo = registrationReceipt?.user;
  const answers = registrationReceipt?.answers;

  const handleButtonClick = () => {
    if (!status) {
      toast.error('لطفاً وضعیت را تعیین کن!');
      return;
    }
    validateRegistrationReceipt({ receiptId: receiptId, status });
  }

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} alignItems='flex-start'>
        <Grid xs={12} sm={8} container item>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            <AnswerSheet answerSheetId={receiptId} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            {userInfo &&
              <Fragment>
                <Typography align='center' variant='h2'>
                  {(userInfo.first_name && userInfo.last_name) ? `${userInfo.first_name} ${userInfo.last_name}` : 'بی‌نام'}
                </Typography>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography >{`پایه: ${registrationReceipt.school_studentship?.grade ? faSeri(registrationReceipt.school_studentship?.grade) : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`جنسیت: ${userInfo.gender == 'Male' ? 'پسر' : (userInfo.gender == 'Female' ? 'دختر' : '؟')}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`استان: ${userInfo.province ? userInfo.province : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`شهر: ${userInfo.city ? userInfo.city : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >{`شماره تماس: ${userInfo.phone_number ? userInfo.phone_number : '؟'}`}</Typography>
                  </Grid>
                </Grid>
                {status &&
                  <Fragment>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>وضعیت ثبت‌نام</InputLabel>
                      <Select
                        value={status}
                        disabled={registrationReceipt?.is_participating}
                        onChange={(e) => setStatus(e.target.value)}
                        name='status'
                        label='وضعیت ثبت‌نام'>
                        <MenuItem value={'Waiting'} >{'منتظر'}</MenuItem>
                        <MenuItem value={'Accepted'} >{'مجاز به پرداخت'}</MenuItem>
                        <MenuItem value={'Rejected'} >{'ردشده'}</MenuItem>
                      </Select>
                    </FormControl >
                    <Box mt={1}>
                      <Button
                        disabled={registrationReceipt?.is_participating}
                        fullWidth variant='contained'
                        onClick={handleButtonClick}
                        color='primary'>
                        {registrationReceipt?.is_participating ? 'ثبت‌نام قطعی است' : 'ثبت'}
                      </Button>
                    </Box>
                  </Fragment>
                }
              </Fragment>
            }
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  registrationReceipt: state.programs.registrationReceipt,
});

export default connect(mapStateToProps, {
  validateRegistrationReceipt: validateRegistrationReceiptAction,
})(RegistrationReceipt);
