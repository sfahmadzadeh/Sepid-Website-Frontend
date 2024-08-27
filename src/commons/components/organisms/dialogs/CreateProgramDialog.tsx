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

import removeBlankAttributes from 'commons/utils/removeBlankAttributes';
import { toast } from 'react-toastify';
import { ProgramType } from 'commons/types/models';
import ProgramInfoForm from 'commons/components/organisms/forms/ProgramInfoForm';
import { useCreateProgramMutation } from 'apps/website-display/redux/features/program/ProgramSlice';

type CreateProgramDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const CreateProgramDialog: FC<CreateProgramDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const t = useTranslate();
  const { websiteName } = useParams();
  const [createProgram, result] = useCreateProgramMutation()
  const [properties, setProperties] = useState<Partial<ProgramType>>({
    name: '',
    description: '',
    cover_page: 'https://kamva-minio-storage.darkube.app/sepid/fsm-placeholder-image.png',
    is_active: true,
    is_visible: true,
    accessible_after_closure: true,
  });

  const handleCreateProgram = () => {
    if (!properties.name) {
      toast.error('لطفاً نام دوره را انتخاب کنید.');
      return;
    }
    if (!properties.description) {
      toast.error('لطفاً توضیحات دوره را بنویسید.');
      return;
    }
    createProgram({ websiteName, ...removeBlankAttributes(properties), onSuccess: handleClose });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('دوره با موفقیت ساخته شد.');
      handleClose(false);
    } else if (result.isError) {
      toast.error('مشکلی در ساخت دوره وجود داشت.')
    }
  }, [result])


  return (
    <Dialog disableScrollLock open={open} maxWidth="md">
      <DialogTitle>{'ایجاد دوره جدید'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems={'start'}>
          <Grid item>
            <Typography gutterBottom>
              {'مشخصات دوره را وارد کنید:'}
            </Typography>
          </Grid>
          <Grid item>
            <ProgramInfoForm data={properties} setData={setProperties} showCoverImage={true} />
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
          onClick={handleCreateProgram}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateProgramDialog;