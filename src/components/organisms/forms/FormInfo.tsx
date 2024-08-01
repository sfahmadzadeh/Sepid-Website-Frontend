import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { FC } from 'react';

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
    </Grid>
  );
}

export default FormInfo;
