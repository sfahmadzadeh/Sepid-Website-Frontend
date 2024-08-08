import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetMerchandiseQuery, useUpdateMerchandiseMutation } from "redux/features/sales/Merchandise";
import { MerchandiseType } from "types/models";
import { deepEqual } from "utils/ObjectEqualityChecker";

type MerchandisePropsType = {
  merchandiseId: string;
};

const Merchandise: FC<MerchandisePropsType> = ({ merchandiseId }) => {

  const [merchandise, setMerchandise] = useState<MerchandiseType>(null);
  const { data: initialMerchandise, isSuccess } = useGetMerchandiseQuery({ merchandiseId });
  const [updateMerchandise, result] = useUpdateMerchandiseMutation();

  useEffect(() => {
    if (isSuccess) {
      setMerchandise(initialMerchandise);
    }
  }, [isSuccess])

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('قیمت بلیط با موفقیت ثبت شد.')
    }
  }, [result])

  const onSubmit = () => {
    updateMerchandise(merchandise);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <TextField
          label='نام بلیط'
          size="small"
          fullWidth
          value={merchandise?.name || ''}
          onChange={(event) =>
            setMerchandise({ ...merchandise, name: event.target.value })
          } />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          size="small"
          label='قیمت'
          fullWidth
          value={merchandise?.price || ''}
          onChange={(event) =>
            setMerchandise({ ...merchandise, price: parseInt(event.target.value) })
          } />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button fullWidth onClick={onSubmit} disabled={deepEqual(initialMerchandise, merchandise)} variant='contained'>
          {'به‌روز‌رسانی'}
        </Button>
      </Grid>
    </Grid >
  )
}

export default Merchandise;