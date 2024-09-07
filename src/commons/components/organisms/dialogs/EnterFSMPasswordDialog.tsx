import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { useEnterFSMMutation } from 'apps/website-display/redux/features/program/PlayerSlice';

type EnterFSMPasswordDialogPropsType = {
  open: boolean;
  handleClose: any;
  fsmId: string;
}

const EnterFSMPasswordDialog: FC<EnterFSMPasswordDialogPropsType> = ({
  open,
  handleClose,
  fsmId,
}) => {
  const navigate = useNavigate();
  const t = useTranslate();
  const [password, setPassword] = useState('');
  const [enterFSM, result] = useEnterFSMMutation();

  useEffect(() => {
    if (result.isSuccess)
      navigate(`fsm/${fsmId}/`)
  }, [result])

  const handleEnterFSM = ({ fsmId, password }) => {
    if (!result.isLoading) {
      enterFSM({ fsmId, password });
    }
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        برای ورود به این کارگاه باید رمز آن را وارد کنید!
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          fullWidth
          autoFocus
          label={t('رمز')}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEnterFSM({ fsmId, password })}>
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnterFSMPasswordDialog;
