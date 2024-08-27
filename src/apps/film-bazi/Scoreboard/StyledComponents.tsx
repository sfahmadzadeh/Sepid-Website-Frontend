import { styled } from '@mui/system';
import { TableContainer, TableHead, TableCell, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)({
  margin: 'auto',
  marginTop: 20,
  borderRadius: 8,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
});

export const StyledTableHead = styled(TableHead)({
  backgroundColor: '#1976d2',
});

export const StyledTableCell = styled(TableCell)({
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const IconWrapper = styled('span')({
  marginRight: 10,
  verticalAlign: 'middle',
  display: 'inline-flex',
  alignItems: 'center',
});