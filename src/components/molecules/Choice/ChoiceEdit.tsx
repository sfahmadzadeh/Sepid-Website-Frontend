import { TextField, InputAdornment, Tooltip, IconButton, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChoiceType } from 'types/widgets';

type ChoiceEditPropsType = {
  choice: ChoiceType;
  onTextChange: any;
  onDelete: any;
  onSelectionChange: any;
}

const ChoiceEdit: FC<ChoiceEditPropsType> = ({
  choice,
  onTextChange,
  onDelete,
  onSelectionChange,
}) => {

  return (
    <TextField
      multiline
      InputProps={{
        startAdornment:
          <InputAdornment position='start'>
            <Tooltip title='انتخاب به‌عنوان گزینه صحیح' arrow>
              <Checkbox size='small' checked={choice.is_correct} onClick={onSelectionChange} />
            </Tooltip>
          </InputAdornment>,
        endAdornment:
          <InputAdornment position='end'>
            <Tooltip title='حذف' arrow>
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
      }}
      fullWidth
      variant='standard'
      value={choice.text}
      onChange={onTextChange}
    />
  );
};

export default ChoiceEdit;