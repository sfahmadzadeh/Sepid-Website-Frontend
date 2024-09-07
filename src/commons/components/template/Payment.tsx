import { Grid, Paper, Stack, Typography } from '@mui/material';
import PurchaseMerchandise from 'commons/components/organisms/PurchaseMerchandise';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetProgramMerchandisesQuery } from 'apps/website-display/redux/features/sales/Merchandise';

type PaymentPropsType = {}

const Payment: FC<PaymentPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: merchandises } = useGetProgramMerchandisesQuery({ programSlug }, { skip: !Boolean(program) })

  return (
    <Stack spacing={4}  >
      <Typography align="center"
        sx={{
          fontSize: 40,
          fontWeight: 600,
          textShadow: '1px 1px #dbd9d9',
        }}>
        {'پرداخت هزینه'}
      </Typography>
      <Stack component={Paper} padding={2}>
        <Grid container spacing={2}>
          <Grid item justifyContent="center" alignItems="center">
            <Typography variant='h6' align="center">
              {'شما برای شرکت در این دوره پذیرفته‌شده‌اید! توجه کنید تا پرداخت خود را انجام ندهید، ثبت‌نامتان قطعی نشده است.'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {merchandises?.filter(merchandise => merchandise.is_active).map(merchandise =>
                <Grid item xs={12} key={merchandise.id}>
                  <PurchaseMerchandise merchandise={merchandise} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Payment;