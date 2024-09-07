import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import { useGetCurrenciesQuery } from 'apps/website-display/redux/features/attributes/AttributesSlice';

type CreateAttributeDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const CreateAttributeDialog: FC<CreateAttributeDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const { data: currencies } = useGetCurrenciesQuery({});

  return (
    <Dialog disableScrollLock open={open} maxWidth="md" onClose={handleClose}>
      <DialogTitle>{'ویژگی‌ها'}</DialogTitle>
      <DialogContent>

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
          onClick={() => { }}>
          {'افزودن'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateAttributeDialog;
