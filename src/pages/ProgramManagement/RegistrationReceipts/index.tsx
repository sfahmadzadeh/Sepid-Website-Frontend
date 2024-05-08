import {
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import RegisterUsersViaCSV from './RegisterUsersViaCSV';
import RegisterOneUser from './RegisterOneUser';
import {
  getAllRegistrationReceiptsAction,
} from 'redux/slices/events';
import { faSeri, toPersianNumber } from 'utils/translateNumber';
import { RegistrationReceiptType } from 'types/models';

const STATUS = {
  Waiting: 'منتظر',
  Accepted: 'مجاز به پرداخت',
  Rejected: 'رد‌شده',
}

type RegistrationReceiptsPropsType = {
  getAllRegistrationReceipts: any;
  allRegistrationReceipts: {
    count: number;
    results: RegistrationReceiptType[];
  }
  registrationFormId: number;
}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({
  getAllRegistrationReceipts,
  allRegistrationReceipts,
  registrationFormId,
}) => {
  const itemsPerPage = 100;
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (registrationFormId && page) {
      getAllRegistrationReceipts({ registrationFormId, pageNumber: page })
    }
  }, [registrationFormId, page])

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack direction='column' spacing={2}>
      <RegisterOneUser />
      <Divider />
      <RegisterUsersViaCSV />
      <Divider />
      <Pagination
        sx={{
          padding: "10px",
          justifySelf: 'center',
        }}
        count={Math.ceil(allRegistrationReceipts.count / itemsPerPage) || 1}
        page={page}
        onChange={handleChange}
        defaultPage={1}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ردیف</TableCell>
              <TableCell align='center'>شناسه</TableCell>
              <TableCell align='center'>نام</TableCell>
              <TableCell align='center'>پایه</TableCell>
              <TableCell align='center'>وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRegistrationReceipts?.results?.slice().sort((a, b) => { return a.id > b.id ? -1 : 1 }).map((registrationReceipt, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {toPersianNumber(index + 1)}
                </TableCell>
                <TableCell align='center'>
                  {toPersianNumber(registrationReceipt.id)}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    href={`/registration-receipt/${registrationReceipt.id}/`}
                    component="a" target="_blank">
                    {(registrationReceipt.user.first_name && registrationReceipt.user.last_name) ? `${registrationReceipt.user.first_name} ${registrationReceipt.user.last_name}` : 'بی‌نام'}
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  {registrationReceipt.school_studentship.grade ? faSeri(registrationReceipt.school_studentship.grade) : '-'}
                </TableCell>
                <TableCell align='center'>
                  {registrationReceipt.is_participating ? 'قطعی' : STATUS[registrationReceipt.status]}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

const mapStateToProps = (state, ownProps) => ({
  registrationFormId: ownProps.registrationFormId,
  allRegistrationReceipts: state.events.allRegistrationReceipts || [],
});

export default connect(mapStateToProps, {
  getAllRegistrationReceipts: getAllRegistrationReceiptsAction,
})(RegistrationReceipts);
