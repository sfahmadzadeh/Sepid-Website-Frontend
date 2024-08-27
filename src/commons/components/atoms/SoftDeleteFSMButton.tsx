import { IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';

import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import { useSoftDeleteFSMMutation } from 'apps/website-display/redux/features/fsm/FSMSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SoftDeleteFSMButtonPropsType = {
  fsmId: string;
  programId: string;
}

const SoftDeleteFSMButton: FC<SoftDeleteFSMButtonPropsType> = ({
  fsmId,
  programId,
}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [softDelete, result] = useSoftDeleteFSMMutation();

  useEffect(() => {
    if (result?.isSuccess) {
      toast.success('کارگاه با موفقیت حذف شد.');
      navigate(`/program/${programId}/`);
    }
  }, [result])

  return (
    <Fragment>
      <Tooltip arrow title='حذف کارگاه'>
        <IconButton onClick={() => setOpenDialog(openDialog => !openDialog)} sx={{ padding: 0 }}>
          <DeleteIcon color='error' />
        </IconButton>
      </Tooltip>
      <AreYouSure
        text='آیا مطمئنید؟ با پاک‌کردن کارگاه، تمام گام‌ها و پاسخ‌های شرکت‌کنندگان برای همیشه حذف خواهد شد.'
        open={openDialog}
        callBackFunction={() => softDelete({ fsmId })}
        handleClose={() => setOpenDialog(openDialog => !openDialog)} />
    </Fragment>
  );
}

export default SoftDeleteFSMButton;
