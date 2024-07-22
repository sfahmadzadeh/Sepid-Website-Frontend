import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateInstituteMutation } from 'redux/features/party/InstituteSlice';

type AddInstituteDialogPropsType = {
  open: boolean;
  handleClose: any;
  onSuccess?: (result: any) => void;
  province: string;
  city: string;
}

const AddInstituteDialog: FC<AddInstituteDialogPropsType> = ({
  open,
  handleClose,
  onSuccess,
  province,
  city,
}) => {
  const [data, setData] = useState(null);
  const [createInstitute, result] = useCreateInstituteMutation();

  const doSetData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleButtonClick = () => {
    if (!data?.name || !data.school_type || !data.gender_type) {
      toast.error('لطفاً همه‌ی موارد ستاره‌دار را تکمیل کنید.');
      return;
    }
    createInstitute({
      institute_type: 'School',
      ...data,
      province,
      city,
    });
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleClose(false);
      onSuccess(result);
    }
  }, [result])

  return (
    <Dialog disableScrollLock maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {'افزودن مدرسه‌ی جدید'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>نوع</InputLabel>
              <Select
                value={data?.school_type || ''}
                onChange={doSetData}
                name="school_type"
                label="پایه">
                <MenuItem value={'Elementary'}>
                  {'دبستان'}
                </MenuItem>
                <MenuItem value={'JuniorHigh'}>
                  {'دبیرستان دوره اول'}
                </MenuItem>
                <MenuItem value={'High'}>
                  {'دبیرستان دوره دوم'}
                </MenuItem>
                <MenuItem value={'SchoolOfArt'}>
                  {'هنرستان'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>دخترانه یا پسرانه</InputLabel>
              <Select
                value={data?.gender_type || ''}
                onChange={doSetData}
                name="gender_type"
                label="دخترانه یا پسرانه">
                <MenuItem value={'Female'}>
                  {'دخترانه'}
                </MenuItem>
                <MenuItem value={'Male'}>
                  {'پسرانه'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="name"
              onChange={doSetData}
              label="نام مدرسه"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone_number"
              onChange={doSetData}
              label="شماره‌تلفن مدرسه"
            />
          </Grid>

          {/* <Grid item container xs={12} sm={6}>
            <FormControl required size='small' sx={{ width: '100%' }}>
              <InputLabel>نوع</InputLabel>
              <Select
                onChange={doSetData}
                name='institute_type'
                label='نوع'
              >
                <MenuItem value={'School'} >{'مدرسه'}</MenuItem>
                <MenuItem value={'University'} >{'دانشگاه'}</MenuItem>
                <MenuItem value={'Other'} >{'غیره'}</MenuItem>
              </Select>
            </FormControl >
          </Grid> */}

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="principal_name"
              onChange={doSetData}
              label="نام مدیر"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="principal_phone"
              onChange={doSetData}
              label="شماره‌تلفن مدیر"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="استان"
              value={province}
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="شهر"
              value={city}
            />
          </Grid>

          <Grid item container xs={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              name="address"
              onChange={doSetData}
              label="آدرس"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="postal_code"
              onChange={doSetData}
              label="کد پستی"
            />
          </Grid>

          <Grid item container xs={12} sm={6}></Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button
            disabled={result.isLoading}
            onClick={handleButtonClick}
            fullWidth
            variant="contained"
            color="secondary">
            ثبت
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default AddInstituteDialog;
