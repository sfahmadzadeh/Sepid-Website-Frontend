import { Box, Button, ButtonGroup, Grid, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import DiscountIcon from '@mui/icons-material/Discount';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from 'redux/slices/events';

import Layout from 'components/template/Layout';
import DiscountCode from './DiscountCode';
import Info from './Info';
import RegistrationForm from './RegistrationForm';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import FSMs from './FSMs';
import Statistics from './Statistics';
import { ProgramType } from 'types/models';

const tabs: { name: string, label: string, icon: any, component: any }[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'registration-form',
    label: 'فرم ثبت‌نام',
    icon: HistoryEduIcon,
    component: RegistrationForm,
  },
  {
    name: 'registration-receipts',
    label: 'رسیدهای ثبت‌نام',
    icon: ConfirmationNumberIcon,
    component: RegistrationReceipts,
  },
  {
    name: 'discount-codes',
    label: 'کد تخفیف',
    icon: DiscountIcon,
    component: DiscountCode,
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
    component: Statistics,
  },
];

type EventType = {
  getOneEventInfo: Function,
  getEventTeams: Function,
  program: ProgramType;
}

const ProgramManagement: FC<EventType> = ({
  getOneEventInfo,
  getEventTeams,
  program,
}) => {
  const t = useTranslate();
  const { programId, section } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!section) {
      navigate(`/program/${programId}/manage/info/`);
    }
  }, [section])

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

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
                {t('back')}
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

const mapStateToProps = (state) => ({
  program: state.events.event,
});

export default connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
  getEventTeams: getEventTeamsAction,
})(ProgramManagement);
