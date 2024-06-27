import React, { FC, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'components/organisms/TinyMCE/ReactTiny/Preview';
import { WidgetModes } from 'components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import Choice from 'components/molecules/Choice';
import { toast } from 'react-toastify';
import { toPersianNumber } from 'utils/translateNumber';
export { MultiChoiceQuestionEditWidget };

type MultiChoiceQuestionWidgetPropsType = {
  onAnswerSubmit: any;
  onAnswerChange: any;
  id: string;
  text: string;
  choices: any[];
  mode: WidgetModes;
  maximum_choices_could_be_chosen: number,
}

const MultiChoiceQuestionWidget: FC<MultiChoiceQuestionWidgetPropsType> = ({
  onAnswerSubmit,
  onAnswerChange,

  id: questionId,
  text: questionText,
  choices: questionChoices,
  mode,
  maximum_choices_could_be_chosen: maximumChoicesCouldBeChosen,
}) => {
  const [selectedChoices, setSelectedChoices] = useState<any[]>([]);

  const onChoiceSelect = (choice) => {
    if (mode === WidgetModes.Edit) return;
    if (maximumChoicesCouldBeChosen === 1) {
      setSelectedChoices([choice])
      submitAnswer([choice]);
    } else {
      const choiceIndex = selectedChoices.indexOf(choice);
      if (choiceIndex === -1) {
        if (selectedChoices.length === maximumChoicesCouldBeChosen) {
          toast.error(`حداکثر ${toPersianNumber(maximumChoicesCouldBeChosen)} گزینه را می‌توانید انتخاب کنید.`)
          return;
        }
        setSelectedChoices([
          ...selectedChoices,
          choice,
        ]);
      } else {
        const selectedChoicesCopy = [...selectedChoices]
        selectedChoicesCopy.splice(choiceIndex, 1);
        setSelectedChoices(selectedChoicesCopy);
      }
    }
  }

  const submitAnswer = (selectedChoices) => {
    onAnswerSubmit({ questionId, selectedChoices });
  }

  return (
    <Stack spacing={1} alignItems='end'>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={questionText}
      />
      <Stack spacing={1}>
        {questionChoices.map((choice) =>
          <Choice
            key={choice.id}
            choice={choice}
            mode={WidgetModes.View}
            isSelected={selectedChoices.includes(choice)}
            onSelectionChange={() => onChoiceSelect(choice)}
            variant={maximumChoicesCouldBeChosen > 1 ? 'checkbox' : 'radio'}
          />
        )}
      </Stack>
      {mode === WidgetModes.View && maximumChoicesCouldBeChosen > 1 && selectedChoices.length > 0 &&
        <Button
          sx={{ width: 80 }}
          variant='contained'
          onClick={() => submitAnswer(selectedChoices)}>
          <Typography fontWeight={400}>
            {'ثبت'}
          </Typography>
        </Button>
      }
    </Stack>
  );
};

export default MultiChoiceQuestionWidget;
