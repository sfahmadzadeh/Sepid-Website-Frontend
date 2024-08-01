import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import JalaliDataTimePicker from 'components/molecules/JalaliDataTimePicker';
import moment from 'moment';
import React, { FC } from 'react';
import { toast } from 'react-toastify';

import { RegistrationFormType } from 'types/models';

type FormInfoPropsType = {
  data: Partial<RegistrationFormType>;
  setData: any;
  showCoverImage?: boolean;
}

const FormInfo: FC<FormInfoPropsType> = ({
  data,
  setData,
}) => {

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const setSinceField = (newValue: string) => {
    if (data?.till) {
      if (moment(newValue).isAfter(moment(data.till))) {
        toast.error('تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد.');
        setData({
          ...data,
          'since': data.till,
        })
        return;
      }
    }
    setData({
      ...data,
      'since': newValue,
    })
  }

  const setTillField = (newValue: string) => {
    if (data?.since) {
      if (moment(data.since).isAfter(moment(newValue))) {
        toast.error('تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.');
        setData({
          ...data,
          'till': data.since,
        })
        return;
      }
    }
    setData({
      ...data,
      'till': newValue,
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'چگونگی تایید افراد'}</InputLabel>
          <Select
            value={data?.accepting_status || ''}
            onChange={putData}
            name='accepting_status'
            label='چگونگی تایید افراد'>
            <MenuItem value={'AutoAccept'}>{'خودکار'}</MenuItem>
            <MenuItem value={'Manual'}>{'دستی'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'وضعیت تحصیلی مخاطبین'}</InputLabel>
          <Select
            value={data?.audience_type || ''}
            onChange={putData}
            name='audience_type'
            label='وضعیت تحصیلی مخاطبین'>
            <MenuItem value={'Student'}>{'دانش‌آموز'}</MenuItem>
            <MenuItem value={'Academic'}>{'دانشجو'}</MenuItem>
            <MenuItem value={'All'}>{'عام'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'جنسیت مخاطبین'}</InputLabel>
          <Select
            value={data?.gender_partition_status || ''}
            onChange={putData}
            name='gender_partition_status'
            label='جنسبت مخاطبین'>
            <MenuItem value={'BothPartitioned'}>{'هر دو گروه'}</MenuItem>
            <MenuItem value={'OnlyMale'}>{'فقط پسران'}</MenuItem>
            <MenuItem value={'OnlyFemale'}>{'فقط دختران'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <JalaliDataTimePicker
          label='شروع ثبت‌نام'
          value={data?.since}
          setValue={setSinceField} />
      </Grid>
      <Grid item xs={12} md={6}>
        <JalaliDataTimePicker
          label='پایان ثبت‌نام'
          value={data?.till}
          setValue={setTillField} />
      </Grid>
    </Grid>
  );
}

export default FormInfo;
