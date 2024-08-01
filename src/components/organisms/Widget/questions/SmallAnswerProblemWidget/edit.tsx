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
import TinyEditorComponent from 'components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { QuestionWidgetType } from 'types/widgets/QuestionWidget';
import EditQuestionWidgetFields from 'components/organisms/forms/EditQuestionWidgetFields';

function SmallAnswerProblemEditWidget({
  onMutate,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  correct_answer: oldCorrectAnswer,
  paperId,
  id: widgetId,
  ...questionWidgetProps
}) {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [correctAnswer, setCorrectAnswer] = useState<string>(oldCorrectAnswer?.text || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');
  const [questionWidgetFields, setQuestionWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...questionWidgetProps });

  const handleSubmit = () => {
    const body = {
      widgetId,
      paper: paperId,
      text,
      solution,
      onSuccess: handleClose,
      ...questionWidgetFields
    }
    if (correctAnswer) {
      body['correct_answer'] = {
        text: correctAnswer,
        answer_type: 'SmallAnswer',
      }
    }
    onMutate(body);
  };

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('shortAnswerQuestion')}</DialogTitle>
      <DialogContent>
        <Stack spacing={1} alignItems={'start'}>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent
            content={text}
            onChange={(text) => setText(text)}
          />
          <label>{'پاسخ صحیح'}</label>
          <TextField
            variant='outlined'
            fullWidth
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
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
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default SmallAnswerProblemEditWidget;
