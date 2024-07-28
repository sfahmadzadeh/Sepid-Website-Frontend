import {
  Button,
  Divider,
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
import Iran from 'utils/iran';
import { toEnglishNumber } from 'utils/translateNumber';
import isNumber from 'utils/validators/isNumber';
import { toast } from 'react-toastify';
import ChangePhoneNumberDialog from 'components/organisms/dialogs/ChangePhoneNumberDialog';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from 'redux/features/party/ProfileSlice';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

type UserSettingPropsType = {
  onSuccessfulSubmission?: any;
}

const hasUserCompletedPrimaryInformation = (userInfo) => {
  const { first_name, last_name, birth_date, gender, province, city } = userInfo;
  return first_name && last_name && birth_date && gender && province && city;
}

const UserSetting: FC<UserSettingPropsType> = ({
  onSuccessfulSubmission,
}) => {
  const [updateUserProfile, updateUserProfileResult] = useUpdateUserProfileMutation();
  const initialUserInfo = useSelector((state: any) => state.account.userInfo);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: initialUserInfo.id });
  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setUserInfo({
        ...userInfo,
        ...userProfile,
      });
    }
  }, [userProfile])

  useEffect(() => {
    if (updateUserProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
      onSuccessfulSubmission?.()
    }
  }, [updateUserProfileResult])

  if (!userInfo) return null;

  const handleProfilePictureChange = (event) => {
    if (event.target.files?.[0]) {
      updateUserProfile({
        userId: userInfo.id,
        profile_picture: event.target.files[0],
      });
    }
  };

  const handleFieldsChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitUserInfo = () => {
    if (!hasUserCompletedPrimaryInformation(userInfo)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }

    const newProfile = {};
    for (const key in userInfo) {
      const newVal = userInfo[key];
      const oldVal = userProfile[key];
      if (oldVal !== newVal) {
        newProfile[key] = newVal;
      }
    }

    updateUserProfile({
      userId: userInfo.id,
      ...newProfile,
    });
  };

  const selectedProvince = Iran.Provinces.find(province => province.title == userInfo.province);

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>تصویر</Typography>
        <Divider />
      </Grid>
      <Grid item container spacing={2} alignItems="center">
        <Grid item>
          <img
            alt=""
            style={{
              height: 100,
              width: 100,
              borderRadius: '5px',
              objectFit: 'cover',
            }}
            src={userInfo.profile_picture || PROFILE_PICTURE}
          />
        </Grid>
        <Grid item>
          <Typography>
            برای تغییر تصویر بر روی گزینه‌ی زیر کلیک کنید.
          </Typography>
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              document.getElementById('userProfilePicture').click()
            }>
            انتخاب تصویر
          </Button>
          <input
            accept="image/*"
            id="userProfilePicture"
            style={{ display: 'none' }}
            type="file"
            onChange={handleProfilePictureChange}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>اطلاعات فردی</Typography>
        <Divider />
      </Grid>

      <Grid item container spacing={2}>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            value={userInfo.first_name || ''}
            name="first_name"
            onChange={handleFieldsChange}
            label='نام'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            value={userInfo.last_name || ''}
            name="last_name"
            onChange={handleFieldsChange}
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
                value={userInfo.birth_date ? new Date(userInfo.birth_date) : null}
                onChange={(date) => setUserInfo({ ...userInfo, birth_date: moment(date).format('YYYY-MM-DD') })}
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
              value={userInfo.phone_number || ''}
              onChange={(e) => {
                if (isNumber(e.target.value)) {
                  handleFieldsChange(e);
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
              {userInfo.phone_number ? 'تغییر' : 'تعیین'}
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
              value={userInfo.gender || ''}
              onChange={handleFieldsChange}>
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
              value={userInfo.province || ''}
              onChange={handleFieldsChange}
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
              disabled={!userInfo.province && !userInfo.city}
              value={userInfo.city || ''}
              onChange={handleFieldsChange}
              name="city"
              label="شهر">
              {Iran.Cities.filter((city) =>
                city.province_id == selectedProvince?.id)
                .map((city) => (
                  <MenuItem key={city.id} value={city.title}>
                    {city.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            helperText='جوایز و یادگاری‌ها به این آدرس ارسال می‌شوند.'
            value={userInfo.address || ''}
            name="address"
            multiline
            rows={2}
            onChange={handleFieldsChange}
            label="آدرس منزل (اختیاری)"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="postal_code"
            value={userInfo.postal_code || ''}
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                handleFieldsChange(e);
              }
            }}
            inputProps={{ className: 'ltr-input' }}
            label="کد پستی (اختیاری)"
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Button
            onClick={submitUserInfo}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserSetting;