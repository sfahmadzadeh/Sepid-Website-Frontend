import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import EditHints from 'components/template/EditHints';

const EditHintsDialog = ({
  handleClose,
  hints,
  open,
  referenceId,
  paperId,
}) => {
  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <EditHints paperId={paperId} referenceId={referenceId} type='widget' hints={hints} />
      </DialogContent>
    </Dialog>
  );
}

export default EditHintsDialog;
