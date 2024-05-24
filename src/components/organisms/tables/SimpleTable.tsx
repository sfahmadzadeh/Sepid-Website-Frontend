import React, { FC } from 'react';
import {
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

}

const SimpleTable: FC<SimpleTablePropsType> = ({
  headers,
  rows,
}) => {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>ردیف</TableCell>
            {headers.map((header) =>
              <TableCell key={header.name} align='center'>{header.label}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) =>
            <TableRow key={index}>
              <TableCell align='center'>
                {index + 1}
              </TableCell>
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
  );
}

export default SimpleTable
