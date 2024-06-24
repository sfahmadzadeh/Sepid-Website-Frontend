import { TextField, InputAdornment, Tooltip, Radio, IconButton, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChoiceType } from 'types/widgets';

type MultiChoiceQuestionChoicePropsType = {
  choice: ChoiceType;
  changeChoiceIsCorrect: any;
  deleteChoice: any;
  changeChoiceText: any;
  variant: 'checkbox' | 'radio';
}

const MultiChoiceQuestionChoice: FC<MultiChoiceQuestionChoicePropsType> = ({
  choice,
  changeChoiceIsCorrect,
  deleteChoice,
  changeChoiceText,
  variant,
}) => {

  return (
    <TextField
      multiline
      InputProps={{
        startAdornment:
          <InputAdornment position='start'>
            <Tooltip title='انتخاب به‌عنوان گزینه صحیح' arrow>
              {variant === 'radio' ?
                <Radio size='small' checked={!!choice.is_correct} onClick={changeChoiceIsCorrect} /> :
                <Checkbox size='small' checked={!!choice.is_correct} onClick={changeChoiceIsCorrect} />
              }
            </Tooltip>
          </InputAdornment>,
        endAdornment:
          <InputAdornment position='end'>
            <Tooltip title='حذف' arrow>
              <IconButton onClick={deleteChoice}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
      }}
      fullWidth
      variant='standard'
      value={choice.text}
      onChange={changeChoiceText}
    />
  );
};

export default MultiChoiceQuestionChoice;