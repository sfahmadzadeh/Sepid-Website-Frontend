import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import UploadImage from 'components/molecules/UploadImage';
import React, { FC } from 'react';

import { FSMType } from 'types/models';

type FSMInfoFormPropsType = {
  data: FSMType;
  setData: any;
}

const FSMInfoForm: FC<FSMInfoFormPropsType> = ({
  data,
  setData,
}) => {

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const toggleValue = (name: string) => {
    setData(properties => ({
      ...properties,
      [name]: !properties[name],
    }));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          value={data.name}
          fullWidth
          autoFocus
          variant='outlined'
          label={'نام'}
          name='name'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={6} alignItems={'stretch'} justifyContent={'stretch'}>
        <UploadImage file={data.cover_page} setFile={(file) => setData(properties => ({ ...properties, cover_page: file }))} />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>نوع آموزش</InputLabel>
          <Select
            value={data.fsm_learning_type}
            onChange={putData}
            name='fsm_learning_type'
            label='نوع آموزش'>
            <MenuItem value={'Supervised'}>{'با همیار'}</MenuItem>
            <MenuItem value={'Unsupervised'}>{'بدون همیار'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>وضعیت گروه</InputLabel>
          <Select
            value={data.fsm_p_type}
            onChange={putData}
            name='fsm_p_type'
            label='وضعیت گروه'>
            <MenuItem value={'Individual'}>{'فردی'}</MenuItem>
            <MenuItem value={'Team'}>{'گروهی'}</MenuItem>
            {/* <MenuItem value={'Hybrid'}>{'هیبرید'}</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          autoFocus
          value={data.description}
          variant='outlined'
          label={'توضیحات کارگاه'}
          name='description'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_active'
          checked={data.is_active}
          onChange={() => toggleValue('is_active')}
          control={<Switch color="primary" />}
          label="فعال بودن ورود به کارگاه:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_visible'
          checked={data.is_visible}
          onChange={() => toggleValue('is_visible')}
          control={<Switch color="primary" />}
          label="قابل مشاهده برای دانش‌آموزان:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          autoFocus
          value={data.lock}
          variant='outlined'
          label={'رمز ورود'}
          name='lock'
          onChange={putData}
        />
      </Grid>
    </Grid>
  );
}

export default FSMInfoForm;
