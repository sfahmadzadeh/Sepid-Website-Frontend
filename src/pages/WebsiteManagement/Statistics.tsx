import {
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

type StatisticsTabPropsType = {

}

const StatisticsTab: FC<StatisticsTabPropsType> = ({

}) => {
  const { websiteName } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Stack spacing={3} alignItems={'start'} justifyContent={'center'} paddingTop={2}>

      <Typography variant='h2' gutterBottom>
        {'آمار'}
      </Typography>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار کاربران'}
        </Typography>

      </Stack>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار دوره‌ها'}
        </Typography>

      </Stack>
    </Stack>
  );
}

export default StatisticsTab;