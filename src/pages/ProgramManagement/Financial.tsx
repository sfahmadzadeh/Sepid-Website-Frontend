import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, Fragment, useState } from 'react';
import { toPersianNumber } from 'utils/translateNumber';
import { useParams } from 'react-router-dom';
import Merchandise from 'components/organisms/Merchandise';
import CreateMerchandiseDialog from 'components/organisms/dialogs/CreateMerchandiseDialog';
import { useGetProgramMerchandisesQuery } from 'redux/features/sales/Merchandise';
import { useDeleteDiscountCodeMutation, useGetProgramDiscountCodesQuery } from 'redux/features/sales/DiscountCode';
import CreateDiscountCodeDialog from 'components/organisms/dialogs/CreateDiscountCodeDialog';

type FinancialTabPropsType = {
}

const Financial: FC<FinancialTabPropsType> = ({

}) => {
  const { programId } = useParams();
  const [isCreateMerchandiseDialogOpen, setCreateMerchandiseDialogOpen] = useState(false);
  const [isCreateDiscountCodeDialogOpen, setCreateDiscountCodeDialogOpen] = useState(false);
  const { data: merchandises } = useGetProgramMerchandisesQuery({ programId });
  const { data: discountCodes } = useGetProgramDiscountCodesQuery({ programId });
  const [deleteDiscountCode, result] = useDeleteDiscountCodeMutation();

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
          <Fragment>
            <Button variant='contained' onClick={() => setCreateMerchandiseDialogOpen(!isCreateMerchandiseDialogOpen)}>
              {'افزودن بلیط'}
            </Button>
            <CreateMerchandiseDialog open={isCreateMerchandiseDialogOpen} handleClose={() => setCreateMerchandiseDialogOpen(false)} />
          </Fragment>
        </Stack>
        <Stack spacing={4}>
          {merchandises?.map(merchandise =>
            <Stack key={merchandise.id}>
              <Merchandise merchandise={merchandise} />
            </Stack>
          )}
          {merchandises && merchandises.length === 0 &&
            <Typography>{'بلیطی وجود ندارد.'}</Typography>
          }
        </Stack>
      </Stack>

      <Divider />

      <Stack>
        <Stack padding={2} paddingBottom={0} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'کدهای تخفیف'}
          </Typography>
          <Fragment>
            <Button variant='contained' onClick={() => setCreateDiscountCodeDialogOpen(!isCreateDiscountCodeDialogOpen)}>
              {'افزودن کد تخفیف'}
            </Button>
            <CreateDiscountCodeDialog open={isCreateDiscountCodeDialogOpen} handleClose={() => setCreateDiscountCodeDialogOpen(false)} />
          </Fragment>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>اسم صاحب</TableCell>
                <TableCell align='center'>کد تخفیف</TableCell>
                <TableCell align='center'>میزان تخفیف</TableCell>
                <TableCell align='center'>بلیط‌ها</TableCell>
                <TableCell align='center'>دفعات باقی‌مانده</TableCell>
                <TableCell align='center'>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discountCodes?.map((discountCode, index) =>
                <TableRow key={index}>
                  <TableCell align='center'>
                    {discountCode?.user?.first_name && discountCode.user?.last_name ?
                      `${discountCode.user.first_name} ${discountCode.user.last_name}` :
                      '-'
                    }
                  </TableCell>
                  <TableCell align='center'>
                    {discountCode?.code}
                  </TableCell>
                  <TableCell align='center'>
                    {toPersianNumber(discountCode?.value)}
                  </TableCell>
                  <TableCell align='center'>
                    <Stack spacing={1} alignItems={'center'}>
                      {discountCode?.merchandises.map(merchandise => <Chip label={merchandise.name} />)}
                    </Stack>
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
      </Stack>
    </Stack >
  );
}

export default Financial;