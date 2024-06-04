import { Box, Grid, Pagination, Stack } from '@mui/material';
import React, { FC, useState } from 'react';

import FSMCard from 'components/organisms/cards/FSMCard';
import useWidth from 'utils/UseWidth';
import NoDataFound from 'components/molecules/NoDataFound';
import { useGetFSMsQuery } from 'redux/features/fsm/FSMSlice';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';

type FSMsGridPropsType = {
  programId: string;
}

const FSMsGrid: FC<FSMsGridPropsType> = ({
  programId
}) => {
  const width = useWidth();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: fsmsData, isLoading } = useGetFSMsQuery({ programId, pageNumber })

  const numberOfSkeleton = width === 'sm' || width === 'md' ? 4 : 3;

  const visibleFSMS = fsmsData?.fsms?.filter(fsm => fsm.is_visible)

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(numberOfSkeleton)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6} lg={4}>
            <FSMCard isLoading={true} fsm={null} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (visibleFSMS.length > 0) {
    let tmpArr = [...fsmsData?.fsms].filter(fsm => fsm.is_visible).sort((fsm1, fsm2) => fsm2.order_in_program - fsm1.order_in_program)
    return (
      <Stack>
        <Grid container spacing={2}>
          {tmpArr.map((fsm) => (
            <Grid item key={fsm.id} xs={12} sm={6} lg={4}>
              <FSMCard fsm={fsm} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          variant="outlined"
          color="primary"
          shape='rounded'
          count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
          page={pageNumber}
          onChange={(e, value) => setPageNumber(value)}
        />
      </Stack>
    );
  }

  return (
    <Box my={4}>
      <NoDataFound variant={2} message={'هنوز کارگاه یا آزمونی وجود ندارد!'} />
    </Box>
  );

}

export default FSMsGrid;