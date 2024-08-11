
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from 'components/organisms/dialogs/AddInstitute';
import Iran from 'utils/iran';
import {
  useGetUserProfileQuery,
} from 'redux/features/party/ProfileSlice';
import { useGetSchoolsQuery } from 'redux/features/party/InstituteSlice';
import { SchoolStudentshipType } from 'types/profile';
import getInstituteFullName from 'utils/getInstituteFullName';
import UploadFile from 'components/molecules/UploadFile';
import { Link } from 'react-router-dom';

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

type SchoolSettingInfoFormPropsType = {
  data: Partial<SchoolStudentshipType>;
  setData: Function;
}

const SchoolSettingInfoForm: FC<SchoolSettingInfoFormPropsType> = ({
  data,
  setData,
}) => {
  const [isAddInstituteDialogOpen, setIsAddInstituteDialogOpen] = useState(false);
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });
  const userCityTitle = Iran.Cities.find(city => userProfile?.city == city.title)?.title;
  const { data: schools } = useGetSchoolsQuery({ city: userCityTitle, gender_type: userProfile.gender }, { skip: !userCityTitle || !userProfile.gender });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const institutes_reps = schools?.map((institute) => ({
    id: institute.id,
    name: getInstituteFullName(institute),
  })) || []

  const getHelperText = () => {
    if (!userCityTitle) return 'لطفاً ابتدا شهر خود را انتخاب کنید';
    if (!userProfile.gender) return 'لطفاً ابتدا جنسبت خود را انتخاب کنید';
    return ''
  }

  return (
    <Fragment>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            disabled={!userCityTitle || !userProfile.gender}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setData({
                ...data,
                school: newValue?.id,
              })
            }}
            value={institutes_reps.find(institute => institute.id == (data.school as unknown)) || null}
            renderInput={(params) =>
              <TextField
                required
                {...params}
                label="مدرسه"
                error={!userCityTitle || !userProfile.gender}
                helperText={getHelperText()}
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
            <Typography textAlign={'start'} variant='button'>
              {'اگر مدرسه شما در لیست بالا نیست، برای افزودن آن کلیک کنید.'}
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel>پایه</InputLabel>
            <Select
              onChange={handleChange}
              name="grade"
              value={data.grade}
              label="پایه">
              {GRADES.map((grade) => (
                <MenuItem key={grade.value} value={grade.value}>
                  {grade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='h5'>
              {'مدرکی را برای تایید اطلاعات تحصیلی خود بارگذاری کنید*'}
            </Typography>
            <Stack spacing={1}>
              <UploadFile
                setFileLink={(link) =>
                  setData({
                    ...data,
                    document: link,
                  })} />
              {data?.document &&
                <Button size='small' variant='outlined' component={Link} to={data.document}>
                  <Typography variant='caption' textAlign={'center'}>
                    {'آخرین فایل ارسالی'}
                  </Typography>
                </Button>
              }
            </Stack>

          </Stack>
        </Grid>

      </Grid>

      <AddInstitute
        province={userProfile.province}
        city={userProfile.city}
        gender_type={userProfile.gender}
        open={isAddInstituteDialogOpen}
        onSuccess={(result) => {
          setData({
            ...data,
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

export default SchoolSettingInfoForm;