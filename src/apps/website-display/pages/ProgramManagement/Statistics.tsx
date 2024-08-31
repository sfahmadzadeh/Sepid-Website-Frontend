import {
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import MentorStaticsFSMCard from 'commons/components/organisms/cards/MentorStaticsFSMCard';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/configs/Constants';
import { toPersianNumber } from 'commons/utils/translateNumber';
import MetabaseDashboard from 'commons/components/template/MetabaseDashboard';
import { useGetFSMsQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';

type StatisticsTabPropsType = {

}

const StatisticsTab: FC<StatisticsTabPropsType> = ({

}) => {
  const { programSlug } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: website } = useGetWebsiteQuery();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber }, { skip: !Boolean(program) })

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
          {`تعداد ثبت‌نامی‌های اولیه : ${toPersianNumber(program?.initial_participants_count)} نفر`}
        </Typography>
        <Typography variant='h5'>
          {`تعداد ثبت‌نامی‌های نهایی : ${toPersianNumber(program?.final_participants_count)} نفر`}
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
        {fsmsData?.fsms?.length > 0 &&
          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
            <Stack>
              <Grid container spacing={2} alignItems='center' justifyContent='start'>
                {fsmsData.fsms?.map((fsm) => (
                  <Grid item xs={12} sm={6} md={4} key={fsm.id} alignItems='center' justifyContent='center'>
                    <MentorStaticsFSMCard {...fsm} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        }
        {fsmsData?.fsms?.length === 0 &&
          <NoDataFound message='کارگاهی وجود ندارد.' />
        }
      </Stack>

      <Divider />
      {/* todo: website should not be passed trough this dashboard */}
      <MetabaseDashboard dashboard_id={5} params={{ website: website.name, program: program.id }} />
    </Stack>
  );
}

export default StatisticsTab;
