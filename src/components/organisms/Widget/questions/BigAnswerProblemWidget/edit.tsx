import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import EditQuestionWidgetFields from 'components/organisms/forms/EditQuestionWidgetFields';
import { QuestionWidgetType } from 'types/widgets/QuestionWidget';

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
  id: widgetId,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [solution, setSolution] = useState<string>(previousSolution || '');
  const [questionWidgetFields, setQuestionWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...questionWidgetProps });

  const handleClick = () => {
    onMutate({
      widgetId,
      paper: paperId,
      text: text,
      solution,
      onSuccess: handleClose,
      ...questionWidgetFields
    })
  };

  return (
    <Dialog
      disableScrollLock
      open={open}
      maxWidth="md"
      fullWidth
      scroll="body"
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{'سوال تشریحی'}</DialogTitle>
      <DialogContent>
        <Stack alignItems={'start'} spacing={1}>
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
          <EditQuestionWidgetFields
            fields={questionWidgetFields}
            setFields={setQuestionWidgetFields}
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

export default BigAnswerProblemEditWidget;
