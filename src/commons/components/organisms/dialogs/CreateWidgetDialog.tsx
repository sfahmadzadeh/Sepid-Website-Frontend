import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WIDGET_TYPE_MAPPER from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import useWidgetFactory from 'commons/components/organisms/Widget/useWidgetFactory';
import { WidgetModes } from 'commons/components/organisms/Widget';

type CreateWidgetDialogPropsType = {
  handleClose: any;

  open: boolean;
  paperId: string;
  showContent?: boolean;
  showProblems?: boolean;
}


const CreateWidgetDialog: FC<CreateWidgetDialogPropsType> = ({
  open,
  handleClose,
  paperId,
  showContent = true,
  showProblems = false,
}) => {
  const [widgetType, setWidgetType] = useState('');
  const t = useTranslate();
  const widgetProperties = useWidgetFactory({
    paperId,
    widgetType,
    mode: WidgetModes.Create,
  });

  if (widgetType) {
    const {
      onMutate,
      EditWidgetDialog,
    } = widgetProperties;

    return (
      <EditWidgetDialog
        paperId={paperId}
        open={open}
        onMutate={onMutate}
        handleClose={() => {
          setWidgetType('');
          handleClose();
        }}
      />
    );
  }

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('createWidget')}</DialogTitle>
      <DialogContent>
        <FormControl size='small' fullWidth sx={{ width: 200, marginTop: 1 }} variant="outlined">
          <InputLabel>{t('widgetType')}</InputLabel>
          <Select
            onChange={(e) => setWidgetType(e.target.value)}
            name='fsmId'
            value={widgetType}
            label={t('widgetType')}>
            {Object.keys(WIDGET_TYPE_MAPPER)
              .filter((option, index) => (!option.includes('Problem') && showContent) || (option.includes('Problem') && showProblems))
              .map((option, index) => (
                <MenuItem key={index} value={option}>
                  {WIDGET_TYPE_MAPPER[option].label}
                </MenuItem>
              ))}
          </Select>
        </FormControl >
      </DialogContent>
    </Dialog>
  );
}

export default CreateWidgetDialog;
