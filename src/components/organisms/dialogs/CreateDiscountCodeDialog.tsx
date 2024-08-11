import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateDiscountCodeMutation } from "redux/features/sales/DiscountCode";
import { useGetProgramMerchandisesQuery } from "redux/features/sales/Merchandise";
import { DiscountCodeType, MerchandiseType } from "types/models";
import { toEnglishNumber } from "utils/translateNumber";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type CreateDiscountCodeDialogType = {
  open: boolean;
  handleClose: any;
}

const CreateDiscountCodeDialog: FC<CreateDiscountCodeDialogType> = ({
  open,
  handleClose,
}) => {
  const { programId } = useParams();
  const [discountCode, setDiscountCode] = useState<DiscountCodeType>(null);
  const [createDiscountCode, result] = useCreateDiscountCodeMutation();
  const { data: programMerchandises } = useGetProgramMerchandisesQuery({ programId });


  const handleCreateDiscountCode = () => {
    createDiscountCode({
      ...discountCode,
      value: discountCode.value / 100,
      merchandises: (discountCode.merchandises?.map(merchandise => merchandise.id) as any)
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setDiscountCode(null);
      handleClose();
    }
  }, [result])

  return (
    <Dialog disableScrollLock maxWidth="xs" open={open}>
      <DialogTitle>{'افزودن کد تخفیف'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} paddingTop={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='نام کاربری'
              InputProps={{
                sx: { padding: 0 },
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip arrow title={'چنانچه می‌خواهید کد تخفیف مختص کاربر خاصی باشد، نام کاربری او را وارد کنید. در غیر این صورت، کد تخفیف به‌صورت عام خواهد بود.'}>
                      <ErrorOutlineIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={discountCode?.user || ''}
              onChange={(e) =>
                setDiscountCode({
                  ...discountCode,
                  user: (e.target.value as any),
                })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              variant='outlined'
              label='درصد تخفیف'
              value={discountCode?.value || ''}
              onChange={(event) =>
                setDiscountCode({
                  ...discountCode,
                  value: parseInt(toEnglishNumber(event.target.value))
                })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='تعداد دفعات استفاده'
              variant='outlined'
              fullWidth
              onChange={(event) => {
                let value = parseInt(event.target.value);
                if (isNaN(value)) {
                  value = 1;
                }
                if (value < 1) {
                  value = 1;
                }
                setDiscountCode({
                  ...discountCode,
                  remaining: value,
                });
              }}
              type='number'
              inputMode='numeric'
              inputProps={{ min: 1, step: 1 }}
              value={discountCode?.remaining || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='حداکثر میزان تخفیف (تومان)'
              fullWidth
              value={discountCode?.discount_code_limit || ''}
              onChange={(event) =>
                setDiscountCode({ ...discountCode, discount_code_limit: parseInt(event.target.value) })
              } />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setDiscountCode({
                  ...discountCode,
                  merchandises: newValue,
                });
              }}
              value={discountCode?.merchandises || []}
              renderInput={(params) =>
                <TextField
                  required
                  {...params}
                  label="بلیط‌ها"
                />
              }
              options={programMerchandises}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>{'انصراف'}</Button>
        <Button
          variant='contained'
          color='primary'
          disabled={!discountCode}
          onClick={handleCreateDiscountCode}>
          {'افزودن'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default CreateDiscountCodeDialog;