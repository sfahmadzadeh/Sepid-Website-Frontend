
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  FormHelperText,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getInstitutesAction } from 'redux/slices/account';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from 'components/organisms/dialogs/AddInstitute';
import Iran from 'utils/iran';
import { toast } from 'react-toastify';
import {
  useGetUserProfileQuery,
  useUpdateUserStudentshipMutation,
} from 'redux/features/party/ProfileSlice';

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

type SchoolSettingPropsType = {
  getInstitutes: any;
  institutes: any[];
  newlyAddedInstitute?: any;
  onSuccessfulSubmission?: any;
}

const hasUserCompletedStudentshipInformation = (schoolStudentship) => {
  const { grade, school } = schoolStudentship;
  return grade && school;
}

const SchoolSetting: FC<SchoolSettingPropsType> = ({
  getInstitutes,
  institutes,
  newlyAddedInstitute,
  onSuccessfulSubmission,
}) => {
  const [updateUserStudentship, updateUserStudentshipResult] = useUpdateUserStudentshipMutation();
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const [schoolStudentship, setSchoolStudentship] = useState<{ id: string; school: string; grade: number; }>(userInfo.school_studentship);
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });

  useEffect(() => {
    if (userProfile?.school_studentship) {
      setSchoolStudentship({
        id: userProfile.school_studentship.id,
        school: userProfile.school_studentship.school,
        grade: userProfile.school_studentship.grade,
      })
    }
  }, [userProfile])

  useEffect(() => {
    if (newlyAddedInstitute) {
      setSchoolStudentship({
        ...schoolStudentship,
        school: newlyAddedInstitute.id,
      })
    }
  }, [newlyAddedInstitute])

  useEffect(() => {
    if (updateUserStudentshipResult?.isSuccess) {
      onSuccessfulSubmission()
    }
  }, [updateUserStudentshipResult])

  useEffect(() => {
    if (userProfile?.city) {
      getInstitutes({ cityTitle: Iran.Cities.find(city => userProfile.city == city.title).title });
    }
  }, [userProfile]);

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

    updateUserStudentship({
      userStudentshipId: schoolStudentship.id,
      ...schoolStudentship,
    });
  };

  const AddSchoolInstituteIcon = () => {
    return (
      <Tooltip title={userProfile.city ? 'افزودن مدرسه‌ی جدید' : 'لطفاً ابتدا شهر خود را تعیین کنید.'} arrow>
        <IconButton
          size="small"
          onClick={userProfile.city ? () => setAddInstituteDialogStatus(true) : () => { }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Fragment>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>اطلاعات دانش‌آموزی</Typography>
          <Divider />
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>مدرسه</InputLabel>
              <Select
                IconComponent={AddSchoolInstituteIcon}
                onChange={handleFieldsChange}
                name="school"
                value={institutes.find((institute) => institute.id === schoolStudentship.school) ? schoolStudentship.school : ''}
                label="مدرسه">
                {institutes.length > 0 ?
                  institutes.slice().sort((a, b) => {
                    let firstLabel = (a.school_type ? SCHOOL_TYPES[a.school_type] + ' ' : '') + a.name
                    let secondLabel = (b.school_type ? SCHOOL_TYPES[b.school_type] + ' ' : '') + b.name
                    return firstLabel.localeCompare(secondLabel)
                  }).map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {(school.school_type ? SCHOOL_TYPES[school.school_type] + ' ' : '') + school.name}
                    </MenuItem>
                  )) :
                  <MenuItem disabled>
                    {'موردی وجود ندارد.'}
                  </MenuItem>}
              </Select>
              <FormHelperText>
                {'چنانچه مدرسه‌ی شما در لیست نیست، می‌توانید با زدن دکمه‌ی + مدرسه‌ی خود را اضافه کنید.'}
              </FormHelperText>
            </FormControl>
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
        open={addInstituteDialog}
        handleClose={() => {
          setAddInstituteDialogStatus(false);
        }}
      />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  newlyAddedInstitute: state.account.newlyAddedInstitute,
  institutes: state.account.institutes || [],
});

export default connect(mapStateToProps, {
  getInstitutes: getInstitutesAction,
})(SchoolSetting);