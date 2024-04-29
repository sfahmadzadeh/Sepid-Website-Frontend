import {
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  createDiscountCodeAction,
  deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodesAction,
} from 'redux/slices/account';
import { toEnglishNumber, toPersianNumber } from 'utils/translateNumber';
import { toast } from 'react-toastify';
import { ProgramType } from 'types/models';

type FinancialTabPropsType = {
  createDiscountCode: any;
  deleteDiscountCode: any;
  getAllMerchandiseDiscountCodes: any;
  event: ProgramType;
  discountCodes: any;
}

const Financial: FC<FinancialTabPropsType> = ({
  createDiscountCode,
  deleteDiscountCode,
  getAllMerchandiseDiscountCodes,
  event,
  discountCodes,
}) => {
  const [value, setValue] = useState<number>();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (event?.merchandise?.id) {
      getAllMerchandiseDiscountCodes({ merchandiseId: event?.merchandise?.id });
    }
  }, [getAllMerchandiseDiscountCodes, event?.merchandise?.id])

  const handleCreateDiscountCode = () => {
    if (!username) {
      toast.error('نام کاربری کاربر مورد نظر را وارد کنید.');
      return;
    }
    if (!value) {
      toast.error('لطفاً مقدار تخفیف را وارد کنید.');
      return;
    }
    if (value && value > 100 || value < 0 || value.toString().includes('.')) {
      toast.error('لطفاً عددی طبیعی بین ۰ تا ۱۰۰ وارد کنید.');
      return;
    }
    createDiscountCode({ value: (value / 100), merchandise: event?.merchandise?.id, username });
  }

  const handleDeleteDiscountCode = (discountCodeId) => {
    deleteDiscountCode({ discountCodeId })
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'هزینه دوره'}
        </Typography>
        {'todo'}
      </Stack>
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'کدهای تخفیف'}
        </Typography>
        <Stack>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography variant='h4'>
                {'ایجاد کد تخفیف'}
              </Typography>
            </Grid>
            <Grid item container xs spacing={1}>
              <Grid item xs={12} sm={4} >
                <TextField
                  size='small' fullWidth
                  variant='outlined'
                  label='نام کاربری'
                  inputProps={{ className: 'ltr-input' }}
                  value={username} onChange={(e) => setUsername(toEnglishNumber(e.target.value))} />
              </Grid>
              <Grid item xs={12} sm={4} >
                <TextField
                  size='small' fullWidth
                  variant='outlined'
                  label='درصد تخفیف'
                  inputProps={{ className: 'ltr-input' }}
                  value={value} onChange={(e) => setValue(parseInt(toEnglishNumber(e.target.value)))} />
              </Grid>
              <Grid item xs={12} sm={4} >
                <Button
                  fullWidth variant='contained'
                  color='primary'
                  onClick={handleCreateDiscountCode}>{'ایجاد'}</Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4'>
                {'کدهای تخفیف موجود'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>صاحب</TableCell>
                      <TableCell align='center'>شماره</TableCell>
                      <TableCell align='center'>کد</TableCell>
                      <TableCell align='center'>درصد تخفیف</TableCell>
                      <TableCell align='center'>دفعات باقی‌مانده</TableCell>
                      <TableCell align='center'>حذف</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {discountCodes?.map((discountCode, index) =>
                      <TableRow key={index}>
                        <TableCell align='center'>
                          {discountCode?.first_name && discountCode.last_name ?
                            `${discountCode?.first_name} ${discountCode.last_name}` :
                            '-'
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {discountCode?.phone_number || '-'}
                        </TableCell>
                        <TableCell align='center'>
                          {discountCode?.code}
                        </TableCell>
                        <TableCell align='center'>
                          {toPersianNumber(discountCode?.value)}
                        </TableCell>
                        <TableCell align='center'>
                          {toPersianNumber(discountCode?.remaining)}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton size='small'
                            onClick={() => { handleDeleteDiscountCode(discountCode?.id) }}>
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  newDiscountCode: state.account.newDiscountCode,
  discountCodes: state.account.discountCodes,
});

export default connect(mapStateToProps, {
  createDiscountCode: createDiscountCodeAction,
  deleteDiscountCode: deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodes: getAllMerchandiseDiscountCodesAction,
})(Financial);