import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WIDGET_TYPE_MAPPER from 'components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import useWidgetFactory from 'components/organisms/Widget/useWidgetFactory';
import { WidgetModes } from 'components/organisms/Widget';

type CreateWidgetDialogPropsType = {
  handleClose: any;

  open: boolean;
  paperId: number;
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
  const widgeProperties = useWidgetFactory({
    paperId,
    widgetType,
    mode: WidgetModes.Create,
  });

  if (widgetType) {
    const {
      onMutate,
      EditWidgetDialog,
    } = widgeProperties;

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
    <Dialog disableScrollLock open={open} maxWidth='sm' onClose={handleClose}>
      <DialogTitle>{t('createWidget')}</DialogTitle>
      <DialogContent>
        <FormControl size='small' fullWidth style={{ width: '200px' }} variant="outlined">
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
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}

export default CreateWidgetDialog;
