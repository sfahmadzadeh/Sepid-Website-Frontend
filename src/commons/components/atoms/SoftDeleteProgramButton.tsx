import { IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';

import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSoftDeleteProgramMutation } from 'apps/website-display/redux/features/program/ProgramSlice';

type SoftDeleteProgramButtonPropsType = {}

const SoftDeleteProgramButton: FC<SoftDeleteProgramButtonPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [softDeleteProgram, result] = useSoftDeleteProgramMutation();

  useEffect(() => {
    if (result?.isSuccess) {
      toast.success('دوره با موفقیت حذف شد.');
      navigate(`/programs/`);
    }
  }, [result])

  return (
    <Fragment>
      <Tooltip arrow title='حذف دوره'>
        <IconButton onClick={() => setOpenDialog(openDialog => !openDialog)} sx={{ padding: 0 }}>
          <DeleteIcon color='error' />
        </IconButton>
      </Tooltip>
      <AreYouSure
        text='آیا مطمئنید؟ با پاک‌کردن دوره، تمامی کارگاه‌های آن نیز پاک خواهد شد و دیگر قابل بازیابی نیستند.'
        open={openDialog}
        callBackFunction={() => softDeleteProgram({ programSlug })}
        handleClose={() => setOpenDialog(openDialog => !openDialog)} />
    </Fragment>
  );
}

export default SoftDeleteProgramButton;
