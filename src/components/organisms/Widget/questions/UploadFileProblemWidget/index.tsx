import { Button, IconButton, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  clearQuestionAnswerAction,
} from 'redux/slices/Answer';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from 'components/organisms/Widget';
import UploadFile from 'components/molecules/UploadFile';

type UploadFileProblemWidgetPropsType = {
  onAnswerChange: any;
  onAnswerSubmit: any;

  clearQuestionAnswer: any;
  id: number;
  text: string;
  answer_file: string;
  mode: WidgetModes;
}

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  onAnswerChange,
  onAnswerSubmit,

  clearQuestionAnswer,
  id: questionId,
  text = 'محل بارگذاری فایل:',
  answer_file,
  mode,
}) => {
  const t = useTranslate();
  const [fileLink, setFileLink] = useState<string>('');

  useEffect(() => {
    if (answer_file) {
      setFileLink(answer_file)
    }
  }, [answer_file])

  useEffect(() => {
    if (fileLink) {
      onAnswerChange({ answer_file: fileLink });
      if (mode === WidgetModes.View) {
        onAnswerSubmit({
          questionId,
          answerFile: fileLink,
        })
      }
    }
  }, [fileLink])

  const clearFile = (e) => {
    e.preventDefault();
    clearQuestionAnswer({ question_id: questionId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        setFileLink('');
        onAnswerChange({ answer_file: null });
      }
    });
  }

  return (
    <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={1}>
      <Typography>{text}</Typography>
      <Stack justifyContent='flex-end' spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
          <UploadFile setFileLink={setFileLink} />
        }
        {(mode !== WidgetModes.Edit && fileLink) &&
          <Button
            size="small"
            variant='outlined'
            sx={{
              whiteSpace: 'nowrap',
            }}
            endIcon={
              (mode !== WidgetModes.Review &&
                <IconButton size='small' onClick={clearFile}>
                  <ClearIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            href={fileLink}
            component="a"
            target="_blank">
            {'آخرین فایل ارسالی'}
          </Button>
        }
      </Stack>
      {mode === WidgetModes.Review && !fileLink &&
        <Typography color='red' variant='caption'>
          {'پاسخی برای این سوال ثبت نشده است.'}
        </Typography>
      }
    </Stack>
  );
};

export default connect(null, {
  clearQuestionAnswer: clearQuestionAnswerAction,
})(UploadFileProblemWidget);

export { UploadFileProblemEditWidget };
