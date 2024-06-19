import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import { WidgetModes } from 'components/organisms/Widget';
import SmallAnswerProblemEditWidget from './edit';

type SmallAnswerProblemWidgetPropsType = {
  onAnswerChange: any;
  onAnswerSubmit: any;

  reward: any;
  cost: any,
  id: number;
  mode: WidgetModes;
  text: string;
  correct_answer: any;
  last_submitted_answer: any;
  be_corrected: boolean;
}

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  onAnswerChange,
  onAnswerSubmit,

  reward,
  cost,
  id: questionId,
  mode,
  text: problemText,
  last_submitted_answer,
  correct_answer: correctAnswer,
  be_corrected: beCorrected,
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer ? last_submitted_answer.text : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  const changeText = (e) => {
    if (mode === WidgetModes.InAnswerSheet) {
      onAnswerChange({ text: e.target.value });
    }
    setAnswer(e.target.value);
  }

  const submit = () => {
    if (!answer) {
      return;
    }
    setIsSubmitting(true);
    onAnswerSubmit({
      questionId,
      text: answer,
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onFailure: () => {
        setIsSubmitting(false);
      },
    });
  }

  return (
    <Fragment>
      <Stack spacing={1}>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={problemText}
        />
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='stretch'
          spacing={1}>
          {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
            <Fragment>
              <TextField
                fullWidth
                variant='outlined'
                value={answer}
                disabled={hasAnsweredCorrectly}
                error={hasAnswered && !hasAnsweredCorrectly}
                autoComplete='false'
                placeholder={'لطفاً پاسخ خود را وارد کنید.'}
                onChange={changeText}
                size='small'
              />
              {mode === WidgetModes.View &&
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={isSubmitting || hasAnsweredCorrectly}
                  onClick={submit}>
                  {t('submit')}
                </Button>
              }
            </Fragment>
          }
          {mode === WidgetModes.Review &&
            <Fragment>
              {answer ?
                <Typography>{answer}</Typography> :
                <Typography color='red' variant='caption'>
                  {'پاسخی برای این سوال ثبت نشده است.'}
                </Typography>
              }
            </Fragment>
          }
        </Stack>
      </Stack>
    </Fragment>
  );
};

export { SmallAnswerProblemEditWidget };
export default SmallAnswerProblemWidget;
