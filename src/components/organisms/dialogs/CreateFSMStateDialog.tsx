import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';
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


  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('createState')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label={t('stateName')}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => createFSMState({ body: { name }, fsmId }).then(handleClose)}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFSMStateDialog;
