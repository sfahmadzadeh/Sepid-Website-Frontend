import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'commons/components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';

function TextEditWidget({
  onMutate,

  open,
  handleClose,
  text: oldText,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);

  const handleClick = () => {
    onMutate({
      paper: paperId,
      text,
      widgetId,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock fullWidth open={open} maxWidth='md'>
      <DialogTitle>{t('text')}</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>متن مورد نظر خود را وارد کنید.</DialogContentText>
        <TinyEditorComponent
          content={text}
          onChange={(text) => setText(text)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          {'انصراف'}
        </Button>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TextEditWidget;
