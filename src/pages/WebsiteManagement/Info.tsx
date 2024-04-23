import {
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';

type WebsiteInfoPropsType = {

}

const WebsiteInfo: FC<WebsiteInfoPropsType> = ({

}) => {
  const { data: website } = useGetWebsiteQuery();

  return (
    <Fragment>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{website?.display_name}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default WebsiteInfo;
