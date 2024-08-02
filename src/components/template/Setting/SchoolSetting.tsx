
import {
  Button,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetUserProfileQuery,
  useUpdateSchoolStudentshipMutation,
} from 'redux/features/party/ProfileSlice';
import removeBlankAttributes from 'utils/removeBlankAttributes';
import { deepEqual } from 'utils/ObjectEqualityChecker';
import SchoolSettingInfoForm from 'components/organisms/forms/SchoolSettingInfoForm';

type SchoolSettingPropsType = {
  onSuccessfulSubmission?: any;
  isInForm?: boolean;
}

const hasUserCompletedStudentshipInformation = (schoolStudentship) => {
  const { grade, school } = schoolStudentship;
  return grade && school;
}

const SchoolSetting: FC<SchoolSettingPropsType> = ({
  onSuccessfulSubmission,
  isInForm,
}) => {
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const [schoolStudentship, setSchoolStudentship] = useState<{ id: string; school: string; grade: number; }>(userInfo.school_studentship);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });
  const [updateSchoolStudentship, updateUserStudentshipResult] = useUpdateSchoolStudentshipMutation();

  useEffect(() => {
    if (userProfile?.school_studentship) {
      setSchoolStudentship(userProfile.school_studentship)
    }
  }, [userProfile])

  useEffect(() => {
    if (updateUserStudentshipResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
      onSuccessfulSubmission?.()
    }
  }, [updateUserStudentshipResult])

  if (!userProfile || !schoolStudentship) return null;

  const submitSchoolStudentship = () => {
    if (!hasUserCompletedStudentshipInformation(schoolStudentship)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }
    updateSchoolStudentship(removeBlankAttributes(schoolStudentship));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant="h2" gutterBottom>{'اطلاعات دانش‌آموزی'}</Typography>
          {!isInForm &&
            <Button
              disabled={isInForm ? false : deepEqual(schoolStudentship, userProfile?.school_studentship)}
              onClick={submitSchoolStudentship}
              variant="contained"
              color="secondary">
              {'به‌روز‌رسانی'}
            </Button>
          }
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <SchoolSettingInfoForm data={schoolStudentship} setData={setSchoolStudentship} />
      </Grid>

      {isInForm &&
        <Grid item xs={12}>
          <Button
            onClick={submitSchoolStudentship}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      }
    </Grid>
  );
}

export default SchoolSetting;