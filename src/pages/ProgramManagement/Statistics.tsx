import {
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import MentorStaticsFSMCard from 'components/organisms/cards/MentorStaticsFSMCard';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import { toPersianNumber } from 'utils/translateNumber';
import MetabaseDashboard from 'components/template/MetabaseDashboard';
import { useGetFSMsQuery } from 'redux/features/FSMSlice';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

type StatisticsTabPropsType = {

}

const StatisticsTab: FC<StatisticsTabPropsType> = ({

}) => {
  const { programId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: program } = useGetProgramQuery({ programId });
  const { data: fsmsData } = useGetFSMsQuery({ programId, pageNumber })

  const getTotalParticipantsCountOfAllProgramFSMs = (allProgramFSMs) => {
    let totalParticipantsCount = 0;
    for (let fsm of allProgramFSMs) {
      totalParticipantsCount += fsm.players_count;
    }
    return totalParticipantsCount;
  }

  if (!fsmsData) return;

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'آمار دوره'}
        </Typography>
        <Typography variant='h5'>
          {`تعداد افراد ثبت‌نامی : ${toPersianNumber(program?.participants_count)} نفر`}
        </Typography>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'آمار کارگاه‌ها'}
        </Typography>
        <Typography variant='h5'>
          {`مجموع تعداد ورود به کارگاه‌ها : ${toPersianNumber(getTotalParticipantsCountOfAllProgramFSMs(fsmsData.fsms))} نفر`}
        </Typography>
        <Stack>
          <Grid container spacing={2} alignItems='center' justifyContent='start'>
            {fsmsData.fsms?.map((fsm) => (
              <Grid item xs={12} sm={6} md={4} key={fsm.id} alignItems='center' justifyContent='center'>
                <MentorStaticsFSMCard {...fsm} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Pagination
          variant="outlined"
          color="primary"
          shape='rounded'
          count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
          page={pageNumber}
          onChange={(e, value) => setPageNumber(value)}
        />
      </Stack>

      <Divider />

      <MetabaseDashboard dashboard_id={5} params={{ "program_id": programId }} />
    </Stack>
  );
}

export default StatisticsTab;
