
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from 'components/organisms/dialogs/AddInstitute';
import Iran from 'utils/iran';
import { toast } from 'react-toastify';
import {
  useGetUserProfileQuery,
  useUpdateSchoolStudentshipMutation,
} from 'redux/features/party/ProfileSlice';
import { useGetInstitutesQuery } from 'redux/features/party/InstituteSlice';
import removeBlankAttributes from 'utils/removeBlankAttributes';

const GRADES = [
  { value: 1, name: 'اول' },
  { value: 2, name: 'دوم' },
  { value: 3, name: 'سوم' },
  { value: 4, name: 'چهارم' },
  { value: 5, name: 'پنجم' },
  { value: 6, name: 'ششم' },
  { value: 7, name: 'هفتم' },
  { value: 8, name: 'هشتم' },
  { value: 9, name: 'نهم' },
  { value: 10, name: 'دهم' },
  { value: 11, name: 'یازدهم' },
  { value: 12, name: 'دوازدهم' },
];

const SCHOOL_TYPES = {
  'Elementary': 'دبستان',
  'JuniorHigh': 'دبیرستان دوره اول',
  'High': 'دبیرستان دوره دوم',
  'SchoolOfArt': 'هنرستان',
}

const GENDER_TYPE = {
  'Male': 'پسرانه',
  'Female': 'دخترانه',
}

type SchoolSettingPropsType = {
  onSuccessfulSubmission?: any;
}

const hasUserCompletedStudentshipInformation = (schoolStudentship) => {
  const { grade, school } = schoolStudentship;
  return grade && school;
}

const SchoolSetting: FC<SchoolSettingPropsType> = ({
  onSuccessfulSubmission,
}) => {
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const [schoolStudentship, setSchoolStudentship] = useState<{ id: string; school: string; grade: number; }>(userInfo.school_studentship);
  const [isAddInstituteDialogOpen, setIsAddInstituteDialogOpen] = useState(false);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });
  const userCityTitle = Iran.Cities.find(city => userProfile?.city == city.title)?.title;
  const { data: institutes } = useGetInstitutesQuery({ city: userCityTitle }, { skip: !userCityTitle });
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

  const handleFieldsChange = (event) => {
    setSchoolStudentship({
      ...schoolStudentship,
      [event.target.name]: event.target.value,
    });
  };

  const submitSchoolStudentship = () => {
    if (!hasUserCompletedStudentshipInformation(schoolStudentship)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }
    updateSchoolStudentship(removeBlankAttributes(schoolStudentship));
  };

  const institutes_reps = institutes?.map((institute) => ({
    id: institute.id,
    name: `${SCHOOL_TYPES[institute.school_type] ? SCHOOL_TYPES[institute.school_type] + ' ' : ''}${GENDER_TYPE[institute.gender_type] ? GENDER_TYPE[institute.gender_type] + ' ' : ''}${institute.name}`,
  })) || []

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>{'اطلاعات دانش‌آموزی'}</Typography>
          <Divider />
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              disabled={!userCityTitle}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSchoolStudentship({
                  ...schoolStudentship,
                  school: newValue?.id,
                })
              }}
              value={institutes_reps.find(institute => institute.id === schoolStudentship.school) || null}
              renderInput={(params) =>
                <TextField
                  required
                  {...params}
                  label="مدرسه"
                  error={!userCityTitle}
                  helperText={!userCityTitle ? 'لطفاً ابتدا شهر خود را انتخاب کنید' : ''}
                />
              }
              options={institutes_reps}
              noOptionsText={
                <Button disableRipple size='small' color='info' startIcon={<AddCircleOutlineIcon />} onClick={() => setIsAddInstituteDialogOpen(true)}>
                  {'مدرسه‌ای با این مشخصات وجود ندارد. برای افزودن کلیک کنید.'}
                </Button>
              }
            />
            <Button
              disableRipple
              size='small' color='info'
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setIsAddInstituteDialogOpen(true)}>
              {'اگر مدرسه شما در لیست بالا نیست، برای افزودن آن کلیک کنید.'}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>پایه</InputLabel>
              <Select
                onChange={handleFieldsChange}
                name="grade"
                value={schoolStudentship.grade}
                label="پایه">
                {GRADES.map((grade) => (
                  <MenuItem key={grade.value} value={grade.value}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={submitSchoolStudentship}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      </Grid>

      <AddInstitute
        province={userProfile.province}
        city={userProfile.city}
        open={isAddInstituteDialogOpen}
        onSuccess={(result) => {
          setSchoolStudentship({
            ...schoolStudentship,
            school: result.data.id
          });
        }}
        handleClose={() => {
          setIsAddInstituteDialogOpen(false);
        }}
      />
    </Fragment>
  );
}

export default SchoolSetting;