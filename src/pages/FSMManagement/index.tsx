import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { FC, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TimelineIcon from '@mui/icons-material/Timeline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from 'redux/slices/events';
import {
  getOneWorkshopsInfoAction,
} from 'redux/slices/workshop';
import Layout from 'components/template/Layout';
import Design from './Design';
import Edges from './Edges';
import Statistics from './Statistics';
import IndividualRequests from './IndividualRequests';
import Info from './Info';
import TeamRequests from './TeamRequests';
import { ProgramType, FSMType } from 'types/models';
import Mentors from './Mentors';
import GoToAnswer from './GoToAnswer';

const initialTabs = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'design',
    label: 'طراحی',
    icon: DesignServicesIcon,
    component: Design,
  },
  {
    name: 'edges',
    label: 'یال‌ها',
    icon: TimelineIcon,
    component: Edges,
  },
  {
    name: 'mentors',
    label: 'همیارها',
    icon: PersonIcon,
    component: Mentors,
  },
  {
    name: 'correction',
    label: 'تصحیح',
    icon: BorderColorIcon,
    component: GoToAnswer,
  },
  {
    name: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: Statistics,
  },
]

type EventPropsType = {
  getEventTeams: Function,
  getOneEventInfo: Function,
  getOneWorkshopsInfo: Function,
  fsm: FSMType,
  program: ProgramType,
}

const FSMManagement: FC<EventPropsType> = ({
  getEventTeams,
  getOneEventInfo,
  getOneWorkshopsInfo,
  fsm,
  program,
}) => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { fsmId, programId, section } = useParams();

  useEffect(() => {
    if (!section) {
      navigate(`/program/${programId}/fsm/${fsmId}/manage/info/`)
    }
  }, [section])

  const tabs: any[] = (fsm && fsm.id == parseInt(fsmId) && fsm.fsm_learning_type == 'Supervised') ?
    (fsm.fsm_p_type == 'Team') ?
      [
        ...initialTabs,
        {
          name: 'requests',
          label: 'درخواست‌ها',
          icon: QuestionAnswerIcon,
          component: TeamRequests,
        },
      ] : (fsm.fsm_p_type == 'Individual') ?
        [
          ...initialTabs,
          {
            name: 'requests',
            label: 'درخواست‌ها',
            icon: QuestionAnswerIcon,
            component: IndividualRequests,
          },
        ] : initialTabs : initialTabs

  useEffect(() => {
    getOneEventInfo({ programId });
    getOneWorkshopsInfo({ fsmId });
  }, []);

  useEffect(() => {
    if (program && program.registration_form) {
      getEventTeams({ registrationFormId: program.registration_form });
    }
  }, [program]);

  const currentTab = tabs.find(tab => tab.name === section) || tabs[0];
  if (!currentTab) return null;
  const TabComponent = useMemo(() => <currentTab.component />, [fsm, section]);

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid container item sm={3} xs={12} direction="column" justifyContent="flex-start">
          <Stack spacing={2}>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    navigate(`/program/${programId}/fsm/${fsmId}/manage/${tabs[index].name}/`)
                  }}
                  variant={currentTab.name === tab.name ? 'contained' : 'outlined'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              <Button
                component={Link}
                to={`/program/${programId}/fsm/${fsmId}/`}
                startIcon={<VisibilityIcon />}>
                {'مشاهده کارگاه'}
              </Button>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to={`/program/${programId}/`}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3}>
            {TabComponent}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  program: state.events.event,
  fsm: state.workshop.workshop,
});

export default connect(mapStateToProps, {
  getEventTeams: getEventTeamsAction,
  getOneEventInfo: getOneEventInfoAction,
  getOneWorkshopsInfo: getOneWorkshopsInfoAction,
})(FSMManagement);
