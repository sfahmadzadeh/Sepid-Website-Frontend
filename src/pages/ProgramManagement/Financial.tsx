import {
  Button,
  Divider,
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
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  createDiscountCodeAction,
  deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodesAction,
} from 'redux/slices/account';
import { toEnglishNumber, toPersianNumber } from 'utils/translateNumber';
import { toast } from 'react-toastify';
import { ProgramType } from 'types/models';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import { useParams } from 'react-router-dom';
import Merchandise from 'components/organisms/Merchandise';
import CreateMerchandiseDialog from 'components/organisms/dialogs/CreateMerchandiseDialog';
import { useGetProgramMerchandisesQuery } from 'redux/features/sales/Merchandise';

type FinancialTabPropsType = {
  createDiscountCode: any;
  deleteDiscountCode: any;
  getAllMerchandiseDiscountCodes: any;
  program: ProgramType;
  discountCodes: any;
}

const Financial: FC<FinancialTabPropsType> = ({
  createDiscountCode,
  deleteDiscountCode,
  getAllMerchandiseDiscountCodes,
  discountCodes,
}) => {
  const { programId } = useParams();
  const [value, setValue] = useState<string>('');
  const [isCreateMerchandiseOpen, setCreateMerchandiseDialogOpen] = useState(false);
  const [username, setUsername] = useState<string>('');
  const { data: program } = useGetProgramQuery({ programId });
  const { data: merchandises } = useGetProgramMerchandisesQuery({ programId });

  useEffect(() => {
    if (program?.merchandise?.id) {
      getAllMerchandiseDiscountCodes({ merchandiseId: program?.merchandise?.id });
    }
  }, [getAllMerchandiseDiscountCodes, program?.merchandise?.id])

  const handleCreateDiscountCode = () => {
    if (!username) {
      toast.error('نام کاربری کاربر مورد نظر را وارد کنید.');
      return;
    }
    if (!value) {
      toast.error('لطفاً مقدار تخفیف را وارد کنید.');
      return;
    }
    if (+value && +value > 100 || +value < 0 || value.includes('.')) {
      toast.error('لطفاً عددی طبیعی بین ۰ تا ۱۰۰ وارد کنید.');
      return;
    }
    if (!program?.merchandise?.id) {
      toast.error('کالایی برای این دوره تعریف نشده است.')
      return;
    }
    createDiscountCode({ value: (+value / 100), merchandise: program?.merchandise?.id, username });
  }

  const handleDeleteDiscountCode = (discountCodeId) => {
    deleteDiscountCode({ discountCodeId })
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'بلیط‌ها'}
          </Typography>
          {!program.merchandise &&
            <Fragment>
              <Button variant='contained' onClick={() => setCreateMerchandiseDialogOpen(!isCreateMerchandiseOpen)}>
                {'افزودن بلیط'}
              </Button>
              <CreateMerchandiseDialog open={isCreateMerchandiseOpen} handleClose={() => setCreateMerchandiseDialogOpen(false)} />
            </Fragment>
          }
        </Stack>
        <Stack spacing={2}>
          {merchandises?.map(merchandise =>
            <Stack>
              <Merchandise merchandise={merchandise} />
            </Stack>
          )}
          {program.merchandise ?
            <Stack>
            </Stack> :
            <Typography>{'بلیطی وجود ندارد.'}</Typography>
          }
        </Stack>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'کدهای تخفیف'}
        </Typography>
        <Stack>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                size='small' fullWidth
                variant='outlined'
                label='نام کاربری'
                inputProps={{ className: 'ltr-input' }}
                value={username} onChange={(e) => setUsername(toEnglishNumber(e.target.value))} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                label='درصد تخفیف'
                inputProps={{ className: 'ltr-input' }}
                value={value}
                onChange={(e) => setValue(toEnglishNumber(e.target.value))} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth variant='contained'
                color='primary'
                disabled={!username || !value}
                onClick={handleCreateDiscountCode}>{'ایجاد کد تخفیف'}</Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Divider />

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
    </Stack >
  );
}

const mapStateToProps = (state) => ({
  newDiscountCode: state.account.newDiscountCode,
  discountCodes: state.account.discountCodes,
});

export default connect(mapStateToProps, {
  createDiscountCode: createDiscountCodeAction,
  deleteDiscountCode: deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodes: getAllMerchandiseDiscountCodesAction,
})(Financial);