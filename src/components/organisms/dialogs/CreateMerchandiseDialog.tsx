import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateMerchandiseMutation } from "redux/features/sales/Merchandise";
import { MerchandiseType } from "types/models";

type CreateMerchandiseDialogPropsType = {
  open: boolean;
  handleClose: any;
};

const CreateMerchandiseDialog: FC<CreateMerchandiseDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const { programId } = useParams()
  const [merchandise, setMerchandise] = useState<Partial<MerchandiseType>>(null);
  const [createMerchandise, result] = useCreateMerchandiseMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('بلیط با موفقیت اضافه شد.')
      handleClose();
      setMerchandise(null);
    }
  }, [result])

  const onSubmit = () => {
    if (merchandise?.discounted_price > merchandise?.price) {
      toast.error('قیمت تخفیف‌خورده نباید از قیمت اصلی بیشتر باشد.');
      return;
    }
    createMerchandise({
      programId,
      ...merchandise,
    });
  }

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{'افزودن بلیط'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              label='نام بلیط'
              size="small"
              fullWidth
              required
              value={merchandise?.name || ''}
              onChange={(event) =>
                setMerchandise({ ...merchandise, name: event.target.value })
              } />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              label='قیمت (تومان)'
              fullWidth
              required
              value={merchandise?.price || ''}
              onChange={(event) =>
                setMerchandise({ ...merchandise, price: parseInt(event.target.value) })
              } />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              label='قیمت تخفیف‌خورده (تومان)'
              fullWidth
              value={merchandise?.discounted_price || ''}
              onChange={(event) =>
                setMerchandise({ ...merchandise, discounted_price: parseInt(event.target.value) })
              } />
          </Grid>
        </Grid >
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          {'انصراف'}
        </Button>
        <Button disabled={!merchandise} onClick={onSubmit} variant='contained'>
          {'افزودن'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateMerchandiseDialog;