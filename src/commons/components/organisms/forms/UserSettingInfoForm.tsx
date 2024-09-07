import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import Iran from 'commons/utils/iran';
import { toEnglishNumber } from 'commons/utils/translateNumber';
import isNumber from 'commons/utils/validators/isNumber';
import { toast } from 'react-toastify';
import ChangePhoneNumberDialog from 'commons/components/organisms/dialogs/ChangePhoneNumberDialog';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from 'apps/website-display/redux/features/party/ProfileSlice';
import UploadImage from 'commons/components/molecules/UploadImage';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import { UserInfoType } from 'commons/types/profile';


type UserSettingInfoFormPropsType = {
  data: Partial<UserInfoType>;
  setData: Function;
}

const hasUserCompletedPrimaryInformation = (userInfo) => {
  const { first_name, last_name, birth_date, gender, province, city } = userInfo;
  return first_name && last_name && birth_date && gender && province && city;
}

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

const UserSettingInfoForm: FC<UserSettingInfoFormPropsType> = ({
  data,
  setData,
}) => {
  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <UploadImage
          setFile={(file) => {
            setData({
              ...data,
              profile_picture: file,
            })
          }}
          file={data.profile_picture || PROFILE_PICTURE}
          showImageSelf={true} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          value={data.first_name || ''}
          name="first_name"
          onChange={handleChange}
          label='نام'
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          value={data.last_name || ''}
          name="last_name"
          onChange={handleChange}
          label="نام خانوادگی"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl required fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
              label={'تاریخ تولد*'}
              openTo='year'
              views={['year', 'month', 'day']}
              value={data.birth_date ? new Date(data.birth_date) : null}
              onChange={(date) => setData({ ...data, birth_date: moment(date).format('YYYY-MM-DD') })}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack direction={'row'} spacing={1}>
          <TextField
            fullWidth
            required
            disabled={true}
            value={data.phone_number || ''}
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                handleChange(e);
              }
            }}
            name="phone_number"
            inputProps={{ className: 'ltr-input' }}
            label="شماره موبایل"
          />
          <Button
            size='small'
            variant="contained"
            color="primary"
            sx={{
              width: '40%',
              whiteSpace: 'nowrap',
            }}
            onClick={() => setIsChangePhoneNumberDialogOpen(state => !state)}>
            {data.phone_number ? 'تغییر' : 'تعیین'}
          </Button>
          <ChangePhoneNumberDialog
            handleClose={() => setIsChangePhoneNumberDialogOpen(state => !state)}
            open={isChangePhoneNumberDialogOpen} />
        </Stack>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={userInfo.national_code || ''}
            name="national_code"
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                handleFieldsChange(e);
              }
            }}
            inputProps={{ className: 'ltr-input' }}
            label="کد ملی"
          />
        </Grid> */}

      {/* todo: hide email temporarily */}
      {/* <Grid item xs={12} sm={6}>
          <TextField
            disabled={true}
            fullWidth
            value={userInfo.email || ''}
            name="email"
            onChange={handleFieldsChange}
            inputProps={{ className: 'ltr-input' }}
            label="ایمیل"
          />
        </Grid> */}

      <Grid item xs={12}>
        <FormControl>
          <FormLabel required>جنسیت</FormLabel>
          <RadioGroup
            name="gender"
            row
            value={data.gender || ''}
            onChange={handleChange}>
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="پسر"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="دختر"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item container xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>استان</InputLabel>
          <Select
            value={data.province || ''}
            onChange={handleChange}
            name="province"
            label="استان">
            {Iran.Provinces.map((province) => (
              <MenuItem key={province.id} value={province.title}>
                {province.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item container xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>شهر</InputLabel>
          <Select
            disabled={!data.province && !data.city}
            value={data.city || ''}
            onChange={handleChange}
            name="city"
            label="شهر">
            {Iran.Cities.filter((city) =>
              city.province_id == Iran.Provinces.find(province => province.title == data.province)?.id)
              .map((city) => (
                <MenuItem key={city.id} value={city.title}>
                  {city.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs={12}>
        <TextField
          fullWidth
          helperText='جوایز و یادگاری‌ها به این آدرس ارسال می‌شوند.'
          value={data.address || ''}
          name="address"
          multiline
          rows={2}
          onChange={handleChange}
          label="آدرس منزل (اختیاری)"
        />
      </Grid> */}

      {/* <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="postal_code"
          value={data.postal_code || ''}
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              handleChange(e);
            }
          }}
          inputProps={{ className: 'ltr-input' }}
          label="کد پستی (اختیاری)"
        />
      </Grid> */}
    </Grid >
  );
}

export default UserSettingInfoForm;