import {
  Button,
  Dialog,
  Divider,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFile from 'components/molecules/UploadFile';


const AudioEditWidget = ({
  onMutate,
  handleClose,

  paperId,
  open,
  link: previousLink,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [link, setLink] = useState<string>(previousLink || '');

  const handleClick = () => {
    onMutate({
      paper: paperId,
      link,
      widgetId,
      onSuccess: handleClose,
    });
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>صوت</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <UploadFile setFileLink={setLink} />
          <Divider>یا</Divider>
          <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
          <TextField
            fullWidth
            label="آدرس صوت"
            value={link}
            inputProps={{ className: 'ltr-input' }}
            placeholder="http://example.com/example.mp3"
            onChange={(e) => setLink(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AudioEditWidget;
