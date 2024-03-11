import {
  AppBar,
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from 'pages/FSM';
import { getScoresAction } from 'redux/slices/currentState';

function ScoreHistoryDialog({
  open,
  handleClose,
  scores,
  totalScore,
  getScores,
}) {
  const { fsmId, playerId } = useContext(StatePageContext);

  useEffect(() => {
    if (open) {
      getScores({ fsmId, playerId });
    }
  }, [open]);

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ maxHeight: '80vh' }}>
      <AppBar position="static"
        sx={{
          padding: 1,
        }}>
        <Typography variant="h3" align="center">
          جمع امتیازات: {totalScore}
        </Typography>
      </AppBar>

      <Box sx={{
        maxHeight: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">نام گام</TableCell>
              <TableCell align="center"
                sx={{
                  padding: 2,
                  width: 40,
                }}>
                امتیاز
              </TableCell>
              <TableCell align="center">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((result) => (
              <TableRow
                key={result.id}
                style={{ background: result.is_valid ? '#fff' : '#ddd' }}>
                <TableCell component="th" scope="row" align="center">
                  {result.state_name}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="center">
                  {result.score}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {result.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  scores: state.currentState.scores.filter((score) => score.is_valid).reverse(),
  totalScore: state.currentState.totalScore,
});

export default connect(mapStateToProps, { getScores: getScoresAction })(
  ScoreHistoryDialog
);
