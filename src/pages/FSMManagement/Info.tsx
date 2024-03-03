import {
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Workshop } from 'types/models';

type InfoPropsType = {
  workshop: Workshop;
}

const Info: FC<InfoPropsType> = ({
  workshop,
}) => {
  const t = useTranslate();

  return (
    <Fragment>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{workshop?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{workshop?.description}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  workshop: state.workshop.workshop,
});

export default connect(mapStateToProps)(Info);