import React, { FC } from 'react';
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type SimpleTablePropsType = {
  headers: {
    label: string;
    name: string;
  }[];
  rows: any[];
  count?: number;
  itemsPerPage?: number;
  page?: number;
  setPage?: Function;
  hideRowNumbersColumn?: boolean;
}

const SimpleTable: FC<SimpleTablePropsType> = ({
  headers,
  rows,
  count,
  itemsPerPage,
  page,
  setPage,
  hideRowNumbersColumn,
}) => {

  return (
    <Stack>
      {page &&
        <Pagination
          sx={{ alignSelf: 'center' }}
          count={Math.ceil(count / itemsPerPage) || 1}
          page={page}
          onChange={(event, value) => setPage(value)}
          defaultPage={1}
          color="primary"
          showFirstButton
          showLastButton
        />
      }
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {!hideRowNumbersColumn &&
                <TableCell align='center'>ردیف</TableCell>
              }
              {headers.map((header) =>
                <TableCell key={header.name} align='center'>{header.label}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) =>
              <TableRow key={index}>
                {!hideRowNumbersColumn &&
                  <TableCell align='center'>
                    {index + 1}
                  </TableCell>
                }
                {headers.map((header, index) =>
                  <TableCell key={index} align='center'>
                    {row[header.name] || '-'}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default SimpleTable
