import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProgramQuery } from 'redux/features/ProgramSlice';
import {
  applyDiscountCodeAction,
  getOneRegistrationFormAction,
  purchaseProgramAction,
  submitRegistrationFormAction,
} from 'redux/slices/programs';
import removeBlankAttributes from 'utils/removeBlankAttributes';
import { toPersianNumber } from 'utils/translateNumber';

type PaymentPropsType = {
  purchaseProgram: any;
  applyDiscountCode: any;
  discountedPrice: any;
}

const Payment: FC<PaymentPropsType> = ({
  purchaseProgram: purchaseProgram,
  applyDiscountCode,

  discountedPrice,
}) => {
  const { programId } = useParams();
  const [discountCode, setDiscountCode] = useState(null);
  const [price, setPrice] = useState(0);
  const { data: program } = useGetProgramQuery({ programId });

  useEffect(() => {
    setPrice(program.merchandise.price);
  }, [program]);

  useEffect(() => {
    if (discountedPrice) {
      setPrice(discountedPrice);
    }
  }, [discountedPrice]);

  const goForPurchase = () => {
    purchaseProgram(removeBlankAttributes({ merchandise: program.merchandise.id, code: discountCode }));
  };

  const submitDiscount = () => {
    if (!discountCode) {
      toast.error('کد تخفیفت را وارد کن!');
      return;
    }
    applyDiscountCode({
      merchandise: program.merchandise.id,
      code: discountCode,
    });
  };

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
          <Grid item container justifyContent="center" alignItems="center">
            <Typography variant='h6' align="center">
              {'شما برای شرکت در این دوره پذیرفته‌شده‌اید! توجه کنید تا پرداخت خود را انجام ندهید، ثبت‌نامتان قطعی نشده است.'}
            </Typography>
          </Grid>
          <Grid container item justifyContent="center" alignItems='end' spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="کد تخفیف"
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={submitDiscount}>
                  {'اعمال'}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography align="center" gutterBottom>
                  {'مبلغ قابل پرداخت:'}
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontSize: 25,
                    fontWeight: 400,
                  }}>
                  {`${toPersianNumber(price)} تومان`}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={goForPurchase}>
                  {'پرداخت'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  discountedPrice: state.programs.discountedPrice,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  purchaseProgram: purchaseProgramAction,
  submitRegistrationForm: submitRegistrationFormAction,
  applyDiscountCode: applyDiscountCodeAction,
})(Payment);
