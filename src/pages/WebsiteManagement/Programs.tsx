import {
  Grid,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useState, Fragment, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import { addMentorToWorkshopAction } from 'redux/slices/events';
import AddNewThingButton from 'components/atoms/AddNewThingButton';
import { useGetProgramsQuery } from 'redux/features/ProgramSlice';
import ManageProgramCard from 'components/organisms/cards/ManageProgramCard';
import CreateProgramDialog from 'components/organisms/dialogs/CreateProgramDialog';

type ProgramsTabPropsType = {
}

const ProgramsTab: FC<ProgramsTabPropsType> = ({
}) => {
  const { websiteName } = useParams();
  const [openCreateProgramDialog, setOpenCreateProgramDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data,
  } = useGetProgramsQuery({ websiteName });

  const programs = data?.programs || [];
  const count = data?.count || 0;

  return (
    <Fragment>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item container justifyContent='space-between' xs={12} spacing={2} style={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant='h2'>
              {'دوره‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <AddNewThingButton label={'افزودن دوره جدید'} onClick={() => setOpenCreateProgramDialog(true)} />
          </Grid>
        </Grid>

        <Grid container spacing={2}
          alignItems='stretch'
          margin='10px 5px'
          justifyContent="center"
          sx={(theme) => ({
            height: '100%',
            justifyContent: 'start',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              marginRight: "0px",
            },
          })}>
          {programs.map((program) => (
            <Grid container item xs={12} sm={6} md={4} key={program.id} alignItems='center' justifyContent='center'>
              <ManageProgramCard program={program} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <CreateProgramDialog
        open={openCreateProgramDialog}
        handleClose={() => setOpenCreateProgramDialog(!openCreateProgramDialog)} />
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  fsmsCount: state.events.workshopsCount,
  allProgramFsms: state.events.workshops,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
})(ProgramsTab);
