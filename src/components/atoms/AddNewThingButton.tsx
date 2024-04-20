import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

type AddNewThingButtonPropsType = {
  label: string;
  onClick: any;
}

const AddNewThingButton: FC<AddNewThingButtonPropsType> = ({
  label,
  onClick,
}) => {

  return (
    <Button startIcon={<AddIcon />} variant='contained' onClick={onClick}>
      {label}
    </Button>
  )
}

export default AddNewThingButton;