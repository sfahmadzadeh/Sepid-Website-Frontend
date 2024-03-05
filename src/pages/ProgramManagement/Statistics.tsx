import {
  Grid,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addUserToTeamAction,
} from 'redux/slices/events';

function Statistics({
  program,
}) {

  return (
    <Fragment>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{program?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{program?.description}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  program: state.events.event,
});

export default connect(
  mapStateToProps,
  {
    addUserToTeam: addUserToTeamAction,
  }
)(Statistics);
