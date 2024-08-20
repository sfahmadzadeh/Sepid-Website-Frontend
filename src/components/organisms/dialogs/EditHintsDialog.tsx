import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import EditHints from 'components/template/EditHints';
import { DialogTitle } from '@mui/material';

const EditHintsDialog = ({
  handleClose,
  hints,
  open,
  referenceId,
  paperId,
}) => {
  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'راهنمایی‌ها'}</DialogTitle>
      <DialogContent>
        <EditHints paperId={paperId} referenceId={referenceId} type='widget' hints={hints} />
      </DialogContent>
    </Dialog>
  );
}

export default EditHintsDialog;
