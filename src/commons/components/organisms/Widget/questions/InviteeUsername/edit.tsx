import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

function InviteeUsernameEdit({
  onMutate,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  answer: oldAnswer,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [answer, setAnswer] = useState<string>(oldAnswer?.text || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');

  const handleSubmit = () => {
    onMutate({
      widgetId,
      paper: paperId,
      text: text,
      answer,
      solution,
      onSuccess: handleClose,
    });
  };

  return (
    <Dialog disableScrollLock
      open={open}
      maxWidth="sm"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{'کد معرف'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            sx={{ mt: 1 }}
            variant='outlined'
            fullWidth
            value={answer}
            label={'متن سوال خود را وارد کنید'}
            onChange={(e) => setAnswer(e.target.value)}
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
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default InviteeUsernameEdit;
