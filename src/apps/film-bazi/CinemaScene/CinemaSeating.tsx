import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const blackWhiteSeatIcon = process.env.PUBLIC_URL + '/side-projects/assets/black-and-white-chair.png';
const colorfulSeatIcon = process.env.PUBLIC_URL + '/side-projects/assets/chair.png';

const SeatButton = styled(IconButton)(({ theme }) => ({
  width: '60px',
  height: '60px',
  padding: 0,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1) translateY(-5px)',
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

const CinemaSeating = () => {
  const [open, setOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const handleClickOpen = (seatNumber) => {
    if (!reservedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReserve = () => {
    setReservedSeats([...reservedSeats, selectedSeat]);
    setOpen(false);
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 30; i++) {
      const isReserved = reservedSeats.includes(i);
      seats.push(
        <Grid item key={i} xs={2} sm={1.5} md={1}>
          <Tooltip title={isReserved ? "این صندلی رزرو شده است" : `صندلی شماره ${i}`}>
            <SeatButton
              onClick={() => handleClickOpen(i)}
              disabled={isReserved}
              onMouseEnter={() => setHoveredSeat(i)}
              onMouseLeave={() => setHoveredSeat(null)}
            >
              <img
                src={hoveredSeat === i && !isReserved ? colorfulSeatIcon : blackWhiteSeatIcon}
                alt={`Seat ${i}`}
                style={{ opacity: isReserved ? 0.5 : 1 }}
              />
            </SeatButton>
          </Tooltip>
        </Grid>
      );
    }
    return seats;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        m: 2,
        p: 3,
        borderRadius: 2,
        background: `
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%),
          linear-gradient(to bottom, #f0f4ff 0%, #e0e8ff 100%)
        `,
        backgroundSize: '10px 10px, 100% 100%',
        backgroundRepeat: 'repeat, no-repeat',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.8)',
          p: 2,
          mb: 4,
          borderRadius: 1,
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#333',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h5">صحنه سینما</Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {renderSeats()}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>انتخاب صندلی</DialogTitle>
        <DialogContent>
          <DialogContentText>
            شما صندلی شماره {selectedSeat} را انتخاب کرده‌اید. آیا مایل به رزرو این صندلی هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">انصراف</Button>
          <Button onClick={handleReserve} color="primary" variant="contained">تایید و رزرو</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CinemaSeating;