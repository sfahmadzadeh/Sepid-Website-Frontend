import {
  Button,
  ButtonGroup,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetMerchandiseQuery, useSoftDeleteMerchandiseMutation, useUpdateMerchandiseMutation } from "redux/features/sales/Merchandise";
import { MerchandiseType } from "types/models";
import { deepEqual } from "utils/ObjectEqualityChecker";
import AreYouSure from "./dialogs/AreYouSure";

type EditMerchandisePropsType = {
  merchandiseId?: string;
  merchandise?: MerchandiseType;
};

const EditMerchandise: FC<EditMerchandisePropsType> = ({
  merchandiseId,
  merchandise: passedMerchandise,
}) => {
  const [isDeleteMerchandiseDialogOpen, setDeleteMerchandiseDialogOpen] = useState(false);
  const [merchandise, setMerchandise] = useState<MerchandiseType>(passedMerchandise);
  const { data: fetchedMerchandise, isSuccess } = useGetMerchandiseQuery({ merchandiseId }, { skip: Boolean(passedMerchandise) });
  const [updateMerchandise, updateMerchandiseResult] = useUpdateMerchandiseMutation();
  const [softDeleteMerchandise] = useSoftDeleteMerchandiseMutation();

  const initialMerchandise = passedMerchandise || fetchedMerchandise;

  useEffect(() => {
    if (isSuccess) {
      setMerchandise(fetchedMerchandise);
    }
  }, [isSuccess])

  useEffect(() => {
    if (updateMerchandiseResult.isSuccess) {
      toast.success('بلیط با موفقیت به‌روز شد.')
    }
  }, [updateMerchandiseResult])

  const onSubmit = () => {
    if (merchandise.discounted_price > merchandise.price) {
      toast.error('قیمت تخفیف‌خورده باید از قیمت اصلی کمتر باشد.');
      return;
    }
    updateMerchandise(merchandise);
  }

  const setData = ({ fieldName, newValue }) => {
    setMerchandise({
      ...merchandise,
      [fieldName]: newValue,
    })
  }

  const softDeleteMerchandiseCallBack = () => {
    softDeleteMerchandise({ merchandiseId: merchandiseId || merchandise.id })
  }

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} md={9} spacing={1.5}>
        <Grid item xs={12}>
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
        <Grid item xs={6}>
          <TextField
            size="small"
            label='قیمت (ریال)'
            fullWidth
            required
            value={merchandise?.price || ''}
            onChange={(event) => setData({ fieldName: 'price', newValue: parseInt(event.target.value) })} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label='قیمت تخفیف‌خورده (ریال)'
            fullWidth
            value={merchandise?.discounted_price || ''}
            onChange={(event) => setData({ fieldName: 'discounted_price', newValue: parseInt(event.target.value) })} />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={3} spacing={1.5}>
        <Grid item xs={6} md={12}>
          <FormControlLabel
            name='is_active'
            checked={merchandise.is_active}
            onChange={() => setData({ fieldName: 'is_active', newValue: !merchandise.is_active })}
            control={<Switch color="primary" />}
            label="فعال:"
            labelPlacement='start'
          />
        </Grid>
        <Grid item xs={6} md={12}>
          <ButtonGroup fullWidth>
            <Button onClick={() => setDeleteMerchandiseDialogOpen(true)} color='error' variant='outlined'>
              {'حذف'}
            </Button>
            <AreYouSure
              open={isDeleteMerchandiseDialogOpen}
              handleClose={() => setDeleteMerchandiseDialogOpen(!isDeleteMerchandiseDialogOpen)}
              callBackFunction={softDeleteMerchandiseCallBack}
              text={'آیا از پاک‌کردن بلیط مطمئن هستید؟'} />
            <Button onClick={onSubmit} disabled={deepEqual(initialMerchandise, merchandise)} variant='contained'>
              {'به‌روز‌رسانی'}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

    </Grid >
  )
}

export default EditMerchandise;