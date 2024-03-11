import { Button, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';

import ReviewAnswers from 'components/organisms/dialogs/ReviewAnswers';


export default function Index() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        <Typography variant="caption">{'مرور پاسخ‌ها'}</Typography>
      </Button>
      <ReviewAnswers open={open} handleClose={() => setOpen(false)} />
    </Fragment>
  );
}
