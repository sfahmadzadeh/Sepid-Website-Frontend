import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CinemaSeating from './CinemaSeating'; // Assuming CinemaSeating is in a separate file

const CinemaBookingDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="info" onClick={handleOpen}>
        {'بازی با صندلی‌ها'}
      </Button>
      <Dialog
        disableScrollLock
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>انتخاب صندلی سینما</DialogTitle>
        <DialogContent>
          <CinemaSeating />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='outlined'>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CinemaBookingDialog;