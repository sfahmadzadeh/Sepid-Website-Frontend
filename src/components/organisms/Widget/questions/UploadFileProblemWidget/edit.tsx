import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { QuestionWidgetType } from 'types/widgets/QuestionWidget';
import EditQuestionWidgetFields from 'components/template/forms/EditQuestionWidgetFields';

type UploadFileProblemEditWidgetPropsType = {
  onMutate: any;
  handleClose: any;

  open: boolean;
  text: string;
  paperId: number;
  id: number;
  solution: string;
}

const UploadFileProblemEditWidget: FC<UploadFileProblemEditWidgetPropsType> = ({
  onMutate,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  paperId,
  id: widgetId,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [text, setText] = useState(oldText || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');
  const [questionWidgetFields, setQuestionWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...questionWidgetProps });

  const handleSubmit = () => {
    onMutate({
      paper: paperId,
      text: text,
      widgetId,
      solution,
      onSuccess: handleClose,
      ...questionWidgetFields
    });
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} maxWidth='md'>
      <DialogTitle>{'ارسال فایل'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1} alignItems={'start'}>
          <Typography>
            متن درخواستی را که برای ارسال فایل دارید، در قسمت زیر وارد کنید.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            value={text}
            placeholder="مثال: لطفا فایل جواب را ارسال کنید."
            onChange={(e) => setText(e.target.value)}
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
    </Dialog>
  );
}

export default UploadFileProblemEditWidget;
