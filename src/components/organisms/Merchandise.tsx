import { Button, Grid, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetMerchandiseQuery, useUpdateMerchandiseMutation } from "redux/features/sales/Merchandise";
import { MerchandiseType } from "types/models";
import { deepEqual } from "utils/ObjectEqualityChecker";

type MerchandisePropsType = {
  merchandiseId?: string;
  merchandise?: MerchandiseType;
};

const Merchandise: FC<MerchandisePropsType> = ({
  merchandiseId,
  merchandise: passedMerchandise,
}) => {

  const [merchandise, setMerchandise] = useState<MerchandiseType>(passedMerchandise);
  const { data: fetchedMerchandise, isSuccess } = useGetMerchandiseQuery({ merchandiseId }, { skip: Boolean(passedMerchandise) });
  const [updateMerchandise, result] = useUpdateMerchandiseMutation();

  const initialMerchandise = passedMerchandise || fetchedMerchandise;

  useEffect(() => {
    if (isSuccess) {
      setMerchandise(fetchedMerchandise);
    }
  }, [isSuccess])

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('قیمت بلیط با موفقیت ثبت شد.')
    }
  }, [result])

  const onSubmit = () => {
    if (merchandise.discounted_price > merchandise.price) {
      toast.error('قیمت تخفیف‌خورده نباید از قیمت اصلی بیشتر باشد.');
      return;
    }
    updateMerchandise(merchandise);
  }

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} sm={10} spacing={1.5}>
        <Grid item xs={12}>
          <TextField
            label='نام بلیط'
            size="small"
            fullWidth
            value={merchandise?.name || ''}
            onChange={(event) =>
              setMerchandise({ ...merchandise, name: event.target.value })
            } />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label='قیمت (ریال)'
            fullWidth
            value={merchandise?.price || ''}
            onChange={(event) =>
              setMerchandise({ ...merchandise, price: parseInt(event.target.value) })
            } />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label='قیمت تخفیف‌خورده (ریال)'
            fullWidth
            value={merchandise?.discounted_price || ''}
            onChange={(event) =>
              setMerchandise({ ...merchandise, discounted_price: parseInt(event.target.value) })
            } />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button fullWidth onClick={onSubmit} disabled={deepEqual(initialMerchandise, merchandise)} variant='contained'>
          {'به‌روز‌رسانی'}
        </Button>
      </Grid>
    </Grid >
  )
}

export default Merchandise;