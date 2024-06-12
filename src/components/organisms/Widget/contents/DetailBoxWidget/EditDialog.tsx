import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  MobileStepper,
  useTheme,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';
import { EditPaper } from 'components/template/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const DetailBoxEditDialog = ({
  paperId,
  id: widgetId,
  title: previousTitle,
  details,
  onMutate,

  open,
  handleClose,
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState(previousTitle);
  const [activeStep, setActiveStep] = useState(0);
  const [detailsId, setDetailsId] = useState<string>(details?.id);

  const handleNext = () => {
    if (activeStep === 0) {
      onMutate({
        paperId,
        widgetId,
        title,
        onSuccess: (result) => {
          const widget = result.data;
          setDetailsId(widget.details.id);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        },
      });
    }
    if (activeStep === 1) {
      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      maxWidth='md'
      disableScrollLock
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogContent>
        {activeStep === 0 &&
          <Fragment>
            <Typography variant='h5' gutterBottom>{'عنوان'}</Typography>
            <DialogContentText gutterBottom>متن مورد نظر خود را وارد کنید.</DialogContentText>
            <TinyEditorComponent
              content={title}
              onChange={(text) => setTitle(text)}
            />
          </Fragment>
        }
        {activeStep === 1 &&
          <Fragment>
            <Typography mt={2} variant='h5' gutterBottom>{'جزئیات بیشتر'}</Typography>
            <DialogContentText gutterBottom>ویجت‌هایی را که می‌خواهید به‌صورت پنهان‌شونده باشند، اینجا بگذارید.</DialogContentText>
            {detailsId &&
              <EditPaper
                paperId={detailsId}
                mode='contents'
              />
            }
          </Fragment>
        }
      </DialogContent>
      <DialogActions>
        <MobileStepper
          sx={{ width: '100%' }}
          variant="dots"
          steps={2}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext}>
              {activeStep === 0 ? 'بعدی' : 'تمام'}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {'قبلی'}
            </Button>
          }
        />
      </DialogActions>
    </Dialog>
  );
}

export default DetailBoxEditDialog;
