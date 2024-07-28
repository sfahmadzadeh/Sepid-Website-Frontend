import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';

type BigAnswerProblemEditWidgetPropsType = {
  handleClose: any;
  onMutate: any;

  open: boolean;
  text: string;
  solution: any;
  paperId: number;
  id: string;
  is_required?: boolean;
}

const BigAnswerProblemEditWidget: FC<BigAnswerProblemEditWidgetPropsType> = ({
  handleClose,
  onMutate,

  open,
  text: oldText,
  solution: previousSolution,
  paperId,
  is_required: previousIsRequired,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [solution, setSolution] = useState<string>(previousSolution || '');
  const [isRequired, setIsRequired] = useState<boolean>(previousIsRequired || false);

  const handleClick = () => {
    onMutate({
      widgetId,
      paper: paperId,
      text: text,
      solution,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{'سوال تشریحی'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent
            content={text}
            onChange={(val: string) => setText(val)}
          />
          <label>{'راه‌حل'}</label>
          <TinyEditorComponent
            content={solution}
            onChange={(val: string) => setSolution(val)}
          />
          <label>{'راه‌حل'}</label>

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

export default BigAnswerProblemEditWidget;
