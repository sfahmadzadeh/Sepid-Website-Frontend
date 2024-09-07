import { Button, IconButton, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  clearQuestionAnswerAction,
} from 'apps/website-display/redux/slices/Answer';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from 'commons/components/organisms/Widget';
import UploadFile from 'commons/components/molecules/UploadFile';
import { AnswerType } from 'commons/types/models';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';

type UploadFileProblemWidgetPropsType = {
  onAnswerChange: any;
  onAnswerSubmit: any;

  clearQuestionAnswer: any;
  id: number;
  text: string;
  answer_file: string;
  mode: WidgetModes;
  submittedAnswer: AnswerType;
} & QuestionWidgetType;

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  onAnswerChange,
  onAnswerSubmit,

  clearQuestionAnswer,
  id: questionId,
  text = 'محل بارگذاری فایل:',
  mode,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [fileLink, setFileLink] = useState<string>(submittedAnswer?.answer_file || '');

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
    clearQuestionAnswer({ question: questionId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        setFileLink('');
        onAnswerChange({ answer_file: '' });
      }
    });
  }

  return (
    <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={1}>
      <IsRequired disabled={!questionWidgetProps.is_required}>
        <Typography>{text}</Typography>
      </IsRequired>
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
