import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const LogoSkeleton = () => {
  return (
    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} spacing={1}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={150} height={50} />
    </Stack>
  );
}

export default LogoSkeleton;
