import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import RegisterUsersViaCSV from './RegisterUsersViaCSV';
import RegisterOneUser from './RegisterOneUser';
import {
  getAllRegistrationReceiptsAction,
} from 'redux/slices/programs';
import { RegistrationReceiptType } from 'types/models';
import SimpleTable from 'components/organisms/tables/SimpleTable';

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

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <RegisterOneUser />
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <RegisterUsersViaCSV />
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography padding={2} variant='h2' gutterBottom>
          {'شرکت‌کنندگان'}
        </Typography>
        <SimpleTable
          headers={[
            { name: 'id', label: 'شناسه' },
            { name: 'name', label: 'نام' },
            { name: 'status', label: 'وضعیت' },
          ]}
          rows={allRegistrationReceipts?.results?.map((registrationReceipt, index) => ({
            id: registrationReceipt.id,
            name:
              <Button
                href={`/receipt/${registrationReceipt.id}/`}
                component="a" target="_blank">
                {(registrationReceipt.user.first_name && registrationReceipt.user.last_name) ? `${registrationReceipt.user.first_name} ${registrationReceipt.user.last_name}` : 'بی‌نام'}
              </Button>,
            status: registrationReceipt.is_participating ? 'قطعی' : STATUS[registrationReceipt.status],
          }))}
          itemsPerPage={100}
          count={allRegistrationReceipts?.count}
          page={page}
          setPage={setPage}
        />
      </Stack>
    </Stack>
  );
}

const mapStateToProps = (state, ownProps) => ({
  registrationFormId: ownProps.registrationFormId,
  allRegistrationReceipts: state.programs.allRegistrationReceipts || [],
});

export default connect(mapStateToProps, {
  getAllRegistrationReceipts: getAllRegistrationReceiptsAction,
})(RegistrationReceipts);
