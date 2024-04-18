import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import { createWorkshopAction } from 'redux/slices/events';
import FSMCard from '../cards/FSMCard';
import removeBlankAttributes from 'utils/removeBlankAttributes';

type CreateFSMDialog = {
  createWorkshop: any;
  open: boolean;
  handleClose: any;
}

const CreateFSMDialog: FC<CreateFSMDialog> = ({
  createWorkshop,
  open,
  handleClose,
}) => {
  const t = useTranslate();
  const { programId } = useParams();
  const [properties, setProperties] = useState({
    name: '',
    description: '',
    fsm_learning_type: '',
    fsm_p_type: '',
    event: programId,
    cover_page: 'https://kamva-minio-storage.darkube.app/sepid/fsm-placeholder-image.png',
    lock: '',
    is_active: true,
    is_visible: true,
  });

  const putData = (event) => {
    setProperties({
      ...properties,
      [event.target.name]: event.target.value,
    })
  }

  const handeCreateFSM = () => {
    createWorkshop({ ...removeBlankAttributes(properties), onSuccess: handleClose });
  }

  const toggleValue = (name: string) => {
    setProperties(properties => ({
      ...properties,
      [name]: !properties[name],
    }));
  }

  return (
    <Dialog disableScrollLock open={open} maxWidth="md">
      <DialogTitle>{'ایجاد کارگاه جدید'}</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          {'مشخصات کارگاه را وارد کنید:'}
        </DialogContentText>
        <Grid container spacing={4} alignItems={'start'}>
          <Grid item container xs={12} md={8} spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoFocus
                variant='outlined'
                label={'نام'}
                name='name'
                onChange={putData}
              />
            </Grid>
            <Grid item xs={6} alignItems={'stretch'} justifyContent={'stretch'}>
              <UploadImage file={properties.cover_page} setFile={(file) => setProperties(properties => ({ ...properties, cover_page: file }))} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>نوع آموزش</InputLabel>
                <Select
                  value={properties.fsm_learning_type}
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
                  value={properties.fsm_p_type}
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
                variant='outlined'
                label={'توضیحات کارگاه'}
                name='description'
                onChange={putData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                name='is_active'
                checked={properties.is_active}
                onChange={() => toggleValue('is_active')}
                control={<Switch color="primary" />}
                label="فعال بودن ورود به کارگاه:"
                labelPlacement='start'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                name='is_visible'
                checked={properties.is_visible}
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
                variant='outlined'
                label={'رمز ورود'}
                name='lock'
                onChange={putData}
              />
            </Grid>
          </Grid>
          <Grid item container
            xs={12} md={4}
            sx={{
              display: { xs: 'none', md: 'inline' },
              opacity: properties.is_visible ? 1 : 0.2
            }}>
            <FSMCard fsm={properties} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handeCreateFSM}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {
  createWorkshop: createWorkshopAction
})(CreateFSMDialog);
