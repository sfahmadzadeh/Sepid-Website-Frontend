import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from 'redux/features/party/ProfileSlice';
import { deepEqual } from 'utils/ObjectEqualityChecker';
import UserSettingInfoForm from 'components/organisms/forms/UserSettingInfoForm';

type UserSettingPropsType = {
  onSuccessfulSubmission?: any;
  isInForm?: boolean;
}

const hasUserCompletedPrimaryInformation = (userInfo) => {
  const { first_name, last_name, birth_date, gender, province, city } = userInfo;
  return first_name && last_name && birth_date && gender && province && city;
}

const UserSetting: FC<UserSettingPropsType> = ({
  onSuccessfulSubmission,
  isInForm,
}) => {
  const [updateUserProfile, updateUserProfileResult] = useUpdateUserProfileMutation();
  const initialUserInfo = useSelector((state: any) => state.account.userInfo);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: initialUserInfo.id });

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

  if (!userInfo || !userProfile) return null;

  const submitUserInfo = () => {
    if (!hasUserCompletedPrimaryInformation(userInfo)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }

    updateUserProfile({
      userId: userInfo.id,
      ...userInfo,
    });
  }

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h2" gutterBottom>اطلاعات فردی</Typography>
          {!isInForm &&
            <Button
              disabled={deepEqual(userProfile, userInfo)}
              onClick={submitUserInfo}
              variant="contained"
              color="secondary">
              {'به‌روز‌رسانی'}
            </Button>
          }
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <UserSettingInfoForm data={userInfo} setData={setUserInfo} />
      </Grid>
      {isInForm &&
        <Grid item xs={12}>
          <Button
            onClick={submitUserInfo}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      }
    </Grid >
  );
}

export default UserSetting;