import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { StyledTableContainer, StyledTableHead, StyledTableCell, StyledTableRow, IconWrapper } from './StyledComponents';
import { CupIcon, MedalIcon } from './Icons';
import StandingData from './ScoreboardData';

const Scoreboard = () => {
  const [open, setOpen] = useState(false);

  const sortedData = useMemo(() => {
    return [...StandingData].sort((a, b) => b.score - a.score);
  }, []);

  const getMedalIcon = (index, score) => {
    if (index === 0 || score === sortedData[0].score) {
      return <CupIcon />;
    } else if (index === 1 || score === sortedData[1].score) {
      return <MedalIcon color="#C0C0C0" />;
    } else if (index === 2 || score === sortedData[2].score) {
      return <MedalIcon color="#CD7F32" />;
    }
    return null;
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant="contained" color='info' onClick={handleClickOpen} fullWidth>
        جدول امتیازات
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableScrollLock>
        <DialogTitle align="center">{'«جدول امتیازات»'}</DialogTitle>
        <DialogContent>
          <StyledTableContainer>
            <Table sx={{ width: '100%' }}>
              <StyledTableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">رتبه</StyledTableCell>
                  <StyledTableCell align="center">نام و نام خانوادگی</StyledTableCell>
                  <StyledTableCell align="center">امتیاز</StyledTableCell>
                </StyledTableRow>
              </StyledTableHead>
              <TableBody>
                {sortedData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">
                      <IconWrapper>
                        {getMedalIcon(index, row.score)}
                        {index + 1}
                      </IconWrapper>
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='outlined'>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Scoreboard;