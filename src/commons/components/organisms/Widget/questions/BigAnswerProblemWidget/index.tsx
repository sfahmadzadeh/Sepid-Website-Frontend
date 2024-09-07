import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyMCE/ReactTiny/Preview';
import TinyEditorComponent from 'commons/components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { WidgetModes } from 'commons/components/organisms/Widget';
import BigAnswerProblemEditWidget from './edit';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = QuestionWidgetType;

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  onAnswerSubmit,
  onAnswerChange,
  id: questionId,
  text,
  mode,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(submittedAnswer?.text || '');
  const [questionWidgetFields, setQuestionWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...questionWidgetProps });
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const onChangeWrapper = (val: string) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: val });
    };
    setAnswer(val);
  }

  const onSubmitWrapper = (e) => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    onAnswerSubmit({ questionId, text: answer })
  }

  return (
    <Stack spacing={1}>
      <IsRequired disabled={!questionWidgetFields.is_required}>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={text}
        />
      </IsRequired>
      {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
        <TinyEditorComponent
          content={answer}
          onChange={onChangeWrapper}
        />
      }
      {mode === WidgetModes.View &&
        <Button
          disabled={isButtonDisabled}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={onSubmitWrapper}>
          {t('submitAnswer')}
        </Button>
      }
      {mode === WidgetModes.Review &&
        <Fragment>
          {answer ?
            <TinyPreview
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
              content={answer}
            /> :
            <Typography color='red' variant='caption'>
              {'پاسخی برای این سوال ثبت نشده است.'}
            </Typography>
          }
        </Fragment>
      }
    </Stack>
  );
};

export default BigAnswerProblemWidget;
