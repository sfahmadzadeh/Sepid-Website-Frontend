import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MentorStaticsFSMCard from 'components/organisms/cards/MentorStaticsFSMCard';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import {
  getEventWorkshopsAction,
} from 'redux/slices/events';
import { addMentorToWorkshopAction } from 'redux/slices/events';
import { toPersianNumber } from 'utils/translateNumber';

function Statics({
  getEventWorkshops,
  workshopsCount,
  allEventWorkshops,

  program,
}) {
  const { programId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getEventWorkshops({ programId, pageNumber });
  }, [pageNumber]);

  const getTotalParticipantsCountOfAllProgramFSMs = (allEventWorkshops) => {
    let totalParticipantsCount = 0;
    for (let fsm of allEventWorkshops) {
      totalParticipantsCount += fsm.players_count;
    }
    return totalParticipantsCount;
  }

  return (
    <Stack spacing={3} alignItems={'start'} justifyContent={'center'} paddingTop={2}>

      <Typography variant='h2' gutterBottom>
        {'آمار'}
      </Typography>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار دوره'}
        </Typography>
        <Typography variant='h5'>
          {`تعداد افراد ثبت‌نامی : ${toPersianNumber(program?.participants_count)} نفر`}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار کارگاه‌ها'}
        </Typography>
        <Typography variant='h5'>
          {`مجموع تعداد ورود به کارگاه‌ها : ${toPersianNumber(getTotalParticipantsCountOfAllProgramFSMs(allEventWorkshops))} نفر`}
        </Typography>
        <Stack>
          <Grid container spacing={2} alignItems='center' justifyContent="center">
            {allEventWorkshops?.map((workshop) => (
              <Grid item xs={12} sm={6} md={4} key={workshop.id} alignItems='center' justifyContent='center'>
                <MentorStaticsFSMCard {...workshop} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Pagination
          variant="outlined"
          color="primary"
          shape='rounded'
          count={Math.ceil(workshopsCount / ITEMS_PER_PAGE_NUMBER)}
          page={pageNumber}
          onChange={(e, value) => setPageNumber(value)}
        />
      </Stack>

    </Stack>
  );
}
const mapStateToProps = (state) => ({
  workshopsCount: state.events.workshopsCount,
  allEventWorkshops: state.events.workshops,
  program: state.events.event,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
})(Statics);
