import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyEditorComponent from 'components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { toPersianNumber } from 'utils/translateNumber';
import { ChoiceType } from 'types/widgets';
import Choice from 'components/molecules/Choice';
import { toast } from 'react-toastify';
import { WidgetModes } from '../..';

type MultiChoiceQuestionEditWidgetPropsType = {
  onMutate: any;

  text: string;
  open: boolean;
  handleClose: any;
  choices: any[];
  paperId: any;
  id: string;
  maximum_choices_could_be_chosen: number;
}

const MultiChoiceQuestionEditWidget: FC<MultiChoiceQuestionEditWidgetPropsType> = ({
  onMutate,

  text: previousQuestionText,
  choices: previousQuestionChoices,
  paperId,
  id: widgetId,
  handleClose,
  open,
  maximum_choices_could_be_chosen,
}) => {
  const t = useTranslate();
  const [maximumChoicesCouldBeChosen, setMaximumChoicesCouldBeChosen] = useState(maximum_choices_could_be_chosen);
  const [questionText, setQuestionText] = useState(previousQuestionText);
  const [questionChoices, setQuestionChoices] = useState<ChoiceType[]>(
    previousQuestionChoices ?
      previousQuestionChoices :
      [
        { text: 'گزینه ۱' },
        { text: 'گزینه ۲' }
      ]
  );

  const handleSubmit = () => {
    onMutate({
      paper: paperId,
      text: questionText,
      choices: questionChoices,
      widgetId,
      onSuccess: handleClose,
      maximum_choices_could_be_chosen: maximumChoicesCouldBeChosen,
    });
  };

  const changeChoiceText = (newValue, choiceIndex) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      text: newValue
    };
    setQuestionChoices(newChoices);
  };

  const changeChoiceIsCorrect = (choiceIndex: number) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      is_correct: !newChoices[choiceIndex].is_correct,
    };
    setQuestionChoices(newChoices);
  }

  const addNewChoice = () => {
    setQuestionChoices([...questionChoices, { text: `گزینه ${toPersianNumber(questionChoices.length + 1)}` }]);
  }

  const deleteChoice = (choiceIndex: number) => {
    if (questionChoices.length === 1) {
      toast.error('حداقل یک گزینه باید وجود داشته باشد.');
      return;
    }
    const newChoices = [...questionChoices];
    newChoices.splice(choiceIndex, 1);
    setQuestionChoices(newChoices);
  }

  return (
    <Dialog
      disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('multipleChoiceQuestions')}</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <Stack>
            <label>{'صورت سوال:'}</label>
            <TinyEditorComponent content={questionText} onChange={(val) => setQuestionText(val)} />
          </Stack>

          <Stack>
            <Typography gutterBottom>
              {'گزینه‌ها:'}
            </Typography>
            <Stack spacing={2}>
              {questionChoices.map((choice, index) => (
                <Choice
                  key={index}
                  isSelected={choice.is_correct}
                  onSelectionChange={() => changeChoiceIsCorrect(index)}
                  variant={maximumChoicesCouldBeChosen > 1 ? 'checkbox' : 'radio'}
                  choice={choice}
                  onDelete={() => deleteChoice(index)}
                  onTextChange={(event) => changeChoiceText(event.target.value, index)}
                  mode={WidgetModes.Edit}
                />
              ))}
            </Stack>
            <IconButton color="primary" onClick={addNewChoice} sx={{ alignSelf: 'start', padding: 0, marginTop: 1 }}>
              <AddCircleIcon fontSize='large' />
            </IconButton>
          </Stack>

          <TextField
            label='حداکثر تعداد گزینه‌هایی که کاربر بتواند انتخاب کند'
            variant='outlined'
            fullWidth
            onChange={(event) => {
              let value = parseInt(event.target.value);
              if (isNaN(value)) {
                value = 1;
              }
              if (value < 1) {
                value = 1;
              }
              if (value >= questionChoices.length) {
                value = questionChoices.length;
              }
              setMaximumChoicesCouldBeChosen(value);
            }}
            type='number'
            inputMode='numeric'
            inputProps={{ min: 1, max: questionChoices.length, step: 1 }}
            error={!maximumChoicesCouldBeChosen}
            value={maximumChoicesCouldBeChosen}
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

export default MultiChoiceQuestionEditWidget;
