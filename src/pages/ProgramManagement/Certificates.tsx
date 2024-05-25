import {
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

type CertificatesTabPropsType = {}

const CertificatesTab: FC<CertificatesTabPropsType> = ({ }) => {
  const { websiteName } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Stack spacing={3} alignItems={'start'} justifyContent={'center'} paddingTop={2}>

      <Typography variant='h2' gutterBottom>
        {'گواهی‌ها'}
      </Typography>

    </Stack>
  );
}

export default CertificatesTab;