import {
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@mui/material';
import BaleSVG from 'components/atoms/socialMediaSVGs/BaleSVG';
import EitaaSVG from 'components/atoms/socialMediaSVGs/EitaaSVG';
import InstagramSVG from 'components/atoms/socialMediaSVGs/InstagramSVG';
import ShadSVG from 'components/atoms/socialMediaSVGs/ShadSVG';
import TelegramSVG from 'components/atoms/socialMediaSVGs/TelegramSVG';
import React, { FC } from 'react';

import { ProgramContactInfoType } from 'types/models';

type ProgramContactInfoFormPropsType = {
  data: ProgramContactInfoType;
  setData: any;
}

const ProgramContactInfoForm: FC<ProgramContactInfoFormPropsType> = ({
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
      <Grid item xs={12} md={6}>
        <TextField
          value={data.phone_number}
          fullWidth
          variant='outlined'
          label={'شماره تلفن ارتباطی'}
          name='phone_number'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  {EitaaSVG}
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          value={data.eitaa_link}
          fullWidth
          variant='outlined'
          label={'ایتا'}
          name='eitaa_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  {BaleSVG}
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          value={data.bale_link}
          fullWidth
          variant='outlined'
          label={'بله'}
          name='bale_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  {InstagramSVG}
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          value={data.instagram_link}
          fullWidth
          variant='outlined'
          label={'اینستاگرام'}
          name='instagram_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  {ShadSVG}
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          value={data.shad_link}
          fullWidth
          variant='outlined'
          label={'شاد'}
          name='shad_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  {TelegramSVG}
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          value={data.telegram_link}
          fullWidth
          variant='outlined'
          label={'تلگرام'}
          name='telegram_link'
          onChange={putData}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramContactInfoForm;
