import { Box, Button, ButtonGroup, Grid, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getEventTeamsAction,
} from 'redux/slices/events';

import Layout from 'components/template/Layout';
import Financial from './Financial';
import Info from './Info';
import RegistrationForm from './RegistrationForm';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import FSMs from './FSMs';
import StatisticsTab from './Statistics';
import Certificates from './Certificates';
import { DashboardTabType } from 'types/global';
import { useGetProgramQuery } from 'redux/features/ProgramSlice';

const tabs: DashboardTabType[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'registration-form',
    label: 'فرم ثبت‌نام',
    icon: ArticleIcon,
    component: RegistrationForm,
  },
  {
    name: 'registration-receipts',
    label: 'رسیدهای ثبت‌نام',
    icon: ReceiptLongIcon,
    component: RegistrationReceipts,
  },
  {
    name: 'merchandise',
    label: 'اطلاعات مالی',
    icon: AttachMoneyIcon,
    component: Financial,
  },
  {
    name: 'certificates',
    label: 'گواهی‌ها',
    icon: WorkspacePremiumIcon,
    component: Certificates,
    isActive: false,
  },
  {
    name: 'teams',
    label: 'تیم‌ها',
    icon: GroupIcon,
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

type ProgramManagementPropsType = {
  getEventTeams: Function,
}

const ProgramManagement: FC<ProgramManagementPropsType> = ({
  getEventTeams,
}) => {
  const t = useTranslate();
  const { programId, section } = useParams();
  const { data: program } = useGetProgramQuery({ programId });
  const navigate = useNavigate();

  useEffect(() => {
    if (!section) {
      navigate(`/program/${programId}/manage/info/`);
    }
  }, [section])

  useEffect(() => {
    if (program?.registration_form) {
      getEventTeams({ registrationFormId: program.registration_form });
    }
  }, [program]);

  const currentTab = tabs.find(tab => tab.name === section) || tabs[0];
  if (!currentTab || !program) return null;
  const TabComponent = <currentTab.component registrationFormId={program.registration_form} />;

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid container spacing={2} direction="row" justifyContent="center">
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
                    navigate(`/program/${programId}/manage/${tabs[index].name}/`)
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
                to={`/program/${program?.id}`}
                startIcon={<ExitToAppIcon />}>
                {'بازگشت به دوره'}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12} >
          <Paper elevation={3} sx={{ padding: '10px 20px' }}>
            {TabComponent}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default connect(null, {
  getEventTeams: getEventTeamsAction,
})(ProgramManagement);
