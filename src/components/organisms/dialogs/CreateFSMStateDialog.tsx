import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateFSMStateMutation } from 'redux/features/fsm/FSMStateSlice';

type CreateStateDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const CreateFSMStateDialog: FC<CreateStateDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const [name, setName] = useState('');
  const { fsmId } = useParams();
  const t = useTranslate();
  const [createFSMState, result] = useCreateFSMStateMutation();

  const handleCreatingFSMState = () => {
    if (!name) {
      toast.error('لطفاً نام گام را وارد کنید.');
      return;
    }
    createFSMState({ name, fsmId });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('گام جدید با موفقیت ساخته شد.')
      handleClose();
    }
  }, [result])

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('createState')}</DialogTitle>
      <DialogContent>
        <Stack paddingTop={1}>
          <TextField
            fullWidth
            autoFocus
            label={t('stateName')}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreatingFSMState}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFSMStateDialog;
