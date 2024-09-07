import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TimelineIcon from '@mui/icons-material/Timeline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BarChartIcon from '@mui/icons-material/BarChart';
import Layout from 'commons/components/template/Layout';
import DesignStates from './DesignStates';
import Edges from './Edges';
import Statistics from './Statistics';
import IndividualRequests from './IndividualRequests';
import Info from './Info';
import TeamRequests from './TeamRequests';
import Mentors from './Mentors';
import GoToAnswer from './GoToAnswer';
import { DashboardTabType } from 'commons/types/global';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetFSMQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import { useEnterFSMMutation } from 'apps/website-display/redux/features/program/PlayerSlice';
import FSMManagementBreadcrumbs from 'commons/components/organisms/breadcrumbs/FSMManagement';

const initialTabs: DashboardTabType[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'states',
    label: 'گام‌ها',
    icon: DesignServicesIcon,
    component: DesignStates,
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
    isActive: false,
  },
  {
    name: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: Statistics,
  },
]

type FSMManagementPropsType = {}

const FSMManagement: FC<FSMManagementPropsType> = ({ }) => {
  const navigate = useNavigate();
  const { fsmId, programSlug, section } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: program } = useGetProgramQuery({ programSlug });
  const [enterFSM, result] = useEnterFSMMutation();


  useEffect(() => {
    if (!section) {
      navigate(`/program/${programSlug}/fsm/${fsmId}/manage/info/`)
    }
  }, [section])

  useEffect(() => {
    if (result.isSuccess)
      navigate(`/program/${programSlug}/fsm/${fsmId}/`)
  }, [result])

  const tabs: DashboardTabType[] = (fsm && fsm.id == fsmId && fsm.fsm_learning_type == 'Supervised') ?
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

  const currentTab = tabs.find(tab => tab.name === section) || tabs[0];
  if (!currentTab) return null;
  const TabComponent = <currentTab.component />;

  const handleEnterFSM = () => {
    if (!result.isLoading) {
      enterFSM({ fsmId });
    }
  };

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={12} marginTop={-2}>
          <FSMManagementBreadcrumbs />
        </Grid>
        <Grid container item sm={3} xs={12} direction="column" justifyContent="flex-start">
          <Stack spacing={2}>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  disabled={tab.isActive === false}
                  onClick={() => {
                    navigate(`/program/${programSlug}/fsm/${fsmId}/manage/${tabs[index].name}/`)
                  }}
                  variant={currentTab.name === tab.name ? 'contained' : 'outlined'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              <Button
                onClick={handleEnterFSM}
                startIcon={<VisibilityIcon />}>
                {'مشاهده کارگاه'}
              </Button>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to={`/program/${programSlug}/`}
                startIcon={<ExitToAppIcon />}>
                {'بازگشت به دوره'}
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

export default FSMManagement;