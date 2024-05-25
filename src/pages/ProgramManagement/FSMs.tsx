import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useState, Fragment, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MentorFSMCard from 'components/organisms/cards/MentorFSMCard';
import CreateFSMDialog from 'components/organisms/dialogs/CreateFSMDialog';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import { addMentorToWorkshopAction } from 'redux/slices/programs';
import AddNewThingButton from 'components/atoms/AddNewThingButton';
import { useGetFSMsQuery } from 'redux/features/FSMSlice';
import NoDataFound from 'components/molecules/NoDataFound';

type ProgramManagementFsmTabPropsType = {}

const ProgramManagementFsmTab: FC<ProgramManagementFsmTabPropsType> = ({ }) => {
  const { programId } = useParams();
  const [openCreateFSMDialog, setOpenCreateFSMDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data: fsmsData, isLoading } = useGetFSMsQuery({ programId, pageNumber });

  return (
    <Fragment>
      <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>

        <Stack padding={2} spacing={2}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='h2' gutterBottom>
              {'کارگاه‌ها'}
            </Typography>
            <AddNewThingButton label={'افزودن کارگاه جدید'} onClick={() => setOpenCreateFSMDialog(true)} />
          </Stack>
          <Stack spacing={2}>
            {(!isLoading && fsmsData.fsms.length > 0) &&
              <Pagination
                variant="outlined"
                color="primary"
                shape='rounded'
                count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
                page={pageNumber}
                onChange={(e, value) => setPageNumber(value)}
              />
            }
            <Stack>
              <Grid container spacing={2}
                alignItems='stretch'
                justifyContent="center"
                sx={(theme) => ({
                  justifyContent: 'start',
                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                    marginRight: "0px",
                  },
                })}>
                {fsmsData?.fsms?.map((fsm) => (
                  <Grid item xs={12} sm={6} md={4} key={fsm.id}>
                    <MentorFSMCard {...fsm} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
            {(!isLoading && fsmsData.fsms.length == 0) &&
              <NoDataFound variant={3} />
            }
          </Stack>
        </Stack>

      </Stack>
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
