import { Box, Button, ButtonGroup, Grid, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupsIcon from '@mui/icons-material/Groups';
import ClassIcon from '@mui/icons-material/Class';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';

import React, { useEffect, FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Layout from 'commons/components/template/Layout';
import Tickets from './Tickets';
import Info from './Info';
import Registration from './Registration';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import FSMs from './FSMs';
import StatisticsTab from './Statistics';
import Certificates from './Certificates';
import { DashboardTabType } from 'commons/types/global';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Admins from './Admins';
import ProgramManagementBreadcrumbs from 'commons/components/organisms/breadcrumbs/ProgramManagement';

const tabs: DashboardTabType[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'registration-form',
    label: 'فرایند ثبت‌نام',
    icon: ArticleIcon,
    component: Registration,
  },
  {
    name: 'tickets',
    label: 'بلیط‌ها',
    icon: PaymentsIcon,
    component: Tickets,
  },
  {
    name: 'registration-receipts',
    label: 'شرکت‌کنندگان',
    icon: PeopleIcon,
    component: RegistrationReceipts,
  },
  {
    name: 'certificates',
    label: 'گواهی‌ها',
    icon: WorkspacePremiumIcon,
    component: Certificates,
    isActive: false,
  },
  {
    name: 'mentors',
    label: 'مدیران',
    icon: PersonIcon,
    component: Admins,
  },
  {
    name: 'teams',
    label: 'تیم‌ها',
    icon: GroupsIcon,
    component: Teams,
  },
  {
    name: 'fsms',
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: FSMs,
  },
  {
    name: 'statistics',
    label: 'آمارها',
    icon: BarChartIcon,
    component: StatisticsTab,
  },
];

type ProgramManagementPropsType = {}

const ProgramManagement: FC<ProgramManagementPropsType> = ({ }) => {
  const navigate = useNavigate();
  const { programSlug, section } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });


  useEffect(() => {
    if (!section) {
      navigate(`/program/${programSlug}/manage/info/`);
    }
  }, [section])

  const currentTab = tabs.find(tab => tab.name === section) || tabs[0];
  if (!currentTab || !program) return null;
  // todo: it is not necessary to pass registrationFormId to other tabs components
  const TabComponent = <currentTab.component registrationFormId={program.registration_form} />;

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={12} marginTop={-2}>
          <ProgramManagementBreadcrumbs />
        </Grid>
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justifyContent="flex-start">
          <Grid item>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  disabled={tab.isActive === false}
                  key={index}
                  onClick={() => {
                    navigate(`/program/${programSlug}/manage/${tabs[index].name}/`)
                  }}
                  variant={tab.name === section ? 'contained' : 'outlined'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Box mt={1}>
            <Grid item>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to={`/program/${programSlug}/`}
                startIcon={<ExitToAppIcon />}>
                {'بازگشت به دوره'}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12} >
          <Paper elevation={3}>
            {TabComponent}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProgramManagement;