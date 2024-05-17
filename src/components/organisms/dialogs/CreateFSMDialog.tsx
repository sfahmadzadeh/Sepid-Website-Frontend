import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import FSMCard from '../cards/FSMCard';
import removeBlankAttributes from 'utils/removeBlankAttributes';
import { toast } from 'react-toastify';
import FSMInfoForm from 'components/template/forms/FSMInfoForm';
import { FSMType } from 'types/models';
import { useCreateFSMMutation } from 'redux/features/FSMSlice';

type CreateFSMDialog = {
  open: boolean;
  handleClose: any;
}

const CreateFSMDialog: FC<CreateFSMDialog> = ({
  open,
  handleClose,
}) => {
  const t = useTranslate();
  const { programId } = useParams();
  const [properties, setProperties] = useState<Partial<FSMType>>({
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
  const [createFSM, result] = useCreateFSMMutation();

  const handleCreateFSM = () => {
    if (!properties.name) {
      toast.error('لطفاً نام کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_learning_type) {
      toast.error('لطفاً نوع آموزش کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_p_type) {
      toast.error('لطفاً وضعیت گروه کارگاه را انتخاب کنید.');
      return;
    }
    createFSM({ ...removeBlankAttributes(properties), onSuccess: handleClose });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('کارگاه با موفقیت ساخته شد.');
      handleClose(false);
    }
  }, [result])

  return (
    <Dialog disableScrollLock open={open} maxWidth="md">
      <DialogTitle>{'ایجاد کارگاه جدید'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={6} alignItems={'start'}>
          <Grid item container xs={12} md={8} spacing={2}>
            <Grid item>
              <Typography gutterBottom>
                {'مشخصات کارگاه را وارد کنید:'}
              </Typography>
            </Grid>
            <Grid item>
              <FSMInfoForm data={properties} setData={setProperties} />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={4} spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>{'خروجی کار:'}</Typography>
            </Grid>
            <Grid item xs={12} sx={{
              display: { xs: 'none', md: 'inline' },
              opacity: properties.is_visible ? 1 : 0.2
            }}>
              <FSMCard fsm={properties} />
            </Grid>
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
          onClick={handleCreateFSM}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFSMDialog;
