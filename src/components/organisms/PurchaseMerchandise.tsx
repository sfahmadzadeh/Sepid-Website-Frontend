import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApplyDiscountCodeMutation, usePurchaseMutation } from "redux/features/sales/Purchase";
import { MerchandiseType } from "types/models";
import { toPersianNumber } from "utils/translateNumber";

type PurchaseMerchandisePropsType = {
  merchandise: MerchandiseType;
};

const PurchaseMerchandise: FC<PurchaseMerchandisePropsType> = ({
  merchandise,
}) => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState(null);
  const [price, setPrice] = useState(merchandise.price);
  const [applyDiscountCode, applyDiscountCodeResult] = useApplyDiscountCodeMutation();
  const [purchase, purchaseResult] = usePurchaseMutation();

  useEffect(() => {
    if (purchaseResult.isSuccess) {
      toast.success('در حال انتقال به صفحه‌ی پرداخت...');
      setTimeout(() => {
        window.location.href = purchaseResult.data.payment_link;
      }, 3000);
    }
    if (purchaseResult.isError) {
      toast.error('مشکلی در ارتباط با سرور پرداخت وجود دارد. اگر از VPN استفاده می‌کنید، آن را خاموش کن!');
    }
  }, [purchaseResult])

  useEffect(() => {
    if (applyDiscountCodeResult.isSuccess) {
      toast.success('کد تخفیف با موفقیت اعمال شد.');
      setPrice(applyDiscountCodeResult.data.new_price);
    }
  }, [applyDiscountCodeResult])

  const goForPurchase = () => {
    purchase({ merchandiseId: merchandise.id, discountCode });
  };

  const submitDiscount = () => {
    if (!discountCode) {
      toast.error('کد تخفیف را وارد کنید.');
      return;
    }
    applyDiscountCode({
      merchandiseId: merchandise.id,
      discountCode,
    });
  };

  return (
    <Grid container item justifyContent="center" alignItems='start' spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography>
          {`توضیحات: ${merchandise.name}`}
        </Typography>
      </Grid>
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
  )
}

export default PurchaseMerchandise;