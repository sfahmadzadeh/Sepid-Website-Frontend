import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';


function IframeEditWidget({
  handleClose,
  onMutate,

  open,
  paperId,
  link: oldLink,
  id: widgetId,
}) {
  const [link, setLink] = useState(oldLink);
  const t = useTranslate();

  const onEditWrapper = () => {
    onMutate({
      paper: paperId,
      link,
      widgetId,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{'لینک'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography>
            {'لطفاً لینک مورد نظر خود را قرار دهید. '}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label='لینک'
            value={link}
            inputProps={{ className: 'ltr-input' }}
            onChange={(e) => setLink(e.target.value)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button onClick={onEditWrapper} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default IframeEditWidget;
