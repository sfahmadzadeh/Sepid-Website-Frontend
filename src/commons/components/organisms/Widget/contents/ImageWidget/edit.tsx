import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFile from 'commons/components/molecules/UploadFile';

const ImageEditWidget = ({
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
    })
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{t('image')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <UploadFile setFileLink={setLink} />
          <Divider>یا</Divider>
          <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
          <TextField
            fullWidth
            label="آدرس تصویر"
            value={link}
            inputProps={{ className: 'ltr-input' }}
            placeholder="http://example.com/example.png"
            onChange={(e) => setLink(e.target.value)}
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
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageEditWidget;
