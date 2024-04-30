import {
  Grid,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState, Fragment, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MentorFSMCard from 'components/organisms/cards/MentorFSMCard';
import CreateFSMDialog from 'components/organisms/dialogs/CreateFSMDialog';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import { addMentorToWorkshopAction } from 'redux/slices/events';
import AddNewThingButton from 'components/atoms/AddNewThingButton';
import { useGetFSMsQuery } from 'redux/features/FSMSlice';

type ProgramManagementFsmTabPropsType = {
  getEventWorkshops: any;
}

const ProgramManagementFsmTab: FC<ProgramManagementFsmTabPropsType> = ({
  getEventWorkshops,
}) => {
  const { programId } = useParams();
  const [openCreateFSMDialog, setOpenCreateFSMDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: fsmsData
  } = useGetFSMsQuery({ programId, pageNumber });
  useEffect(() => {
    getEventWorkshops({ programId, pageNumber });
  }, [pageNumber]);

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
              {'کارگاه‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <AddNewThingButton label={'افزودن کارگاه جدید'} onClick={() => setOpenCreateFSMDialog(true)} />
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
          {fsmsData?.fsms?.map((fsm) => (
            <Grid container item xs={12} sm={6} md={4} key={fsm.id} alignItems='center' justifyContent='center'>
              <MentorFSMCard {...fsm} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(fsmsData.count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <CreateFSMDialog
        open={openCreateFSMDialog}
        handleClose={() => setOpenCreateFSMDialog(false)}
      />
    </Fragment>
  );
}

export default connect(null, {
  addMentorToWorkshop: addMentorToWorkshopAction,
})(ProgramManagementFsmTab);
