import { Tab, Box, Tabs } from '@mui/material';
import React, { useEffect, useRef, FC, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import TeamWorkshopInfoCard from 'commons/components/organisms/cards/TeamWorkshopInfo';

import { getRequestSubscription } from 'apps/website-display/parse/mentor';
import {
  createRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from 'apps/website-display/redux/slices/programs';

import TeamsTab from './TeamsTab';
import { TeamType } from 'commons/types/models';
import { useGetProgramTeamsQuery } from 'apps/website-display/redux/features/team/TeamSlice';

const Teams: FC<TeamPropsType> = ({
  teamsRequests,
  getRequestMentor = undefined,
  createRequestMentor = undefined,
  removeRequestMentor = undefined,
}) => {
  const { fsmId, programSlug } = useParams();
  const subscriptionRef = useRef(null);
  const [starredTeams, setStarredTeams] = useState([])
  const [value, setValue] = useState(0);
  const { data: programTeams } = useGetProgramTeamsQuery({ programSlug })


  useEffect(() => {
    const subscribe = async () => {
      await getRequestMentor();
      const subscription = await getRequestSubscription();
      subscription.on('create', (requestMentor) => {
        const playerId = requestMentor.get('playerId');
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        createRequestMentor({ playerId, teamId, fsmId });
      });
      subscription.on('delete', (requestMentor) => {
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        removeRequestMentor({
          teamId,
          fsmId,
        });
      });
      subscriptionRef.current = subscription;
    }
    subscribe()
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setStarredTeams(JSON.parse(localStorage.getItem('starredTeams')) || [])
  }, [])

  const teams = programTeams?.map(team =>
    starredTeams.indexOf(team.id) === -1
      ? { ...team, isStarred: false }
      : { ...team, isStarred: true });


  const toggleStar = (teamId: String) => {
    if (starredTeams.indexOf(teamId) !== -1) {
      setStarredTeams((prevArr) => prevArr.filter(id => id !== teamId))
    } else {
      setStarredTeams((prevArr) => [...prevArr, teamId])
    }
  }

  useEffect(() => {
    localStorage.setItem('starredTeams', JSON.stringify(starredTeams))

  }, [programTeams, starredTeams])

  if (!teamsRequests) {
    return null;
  }

  const reqTeams =
    teams.filter(
      (team) => teamsRequests[team.id + '.' + fsmId]
    ).sort((a, b) => {
      if (!isNaN(parseInt(a.name)) && !isNaN(parseInt(b.name)) && parseInt(b.name) !== parseInt(a.name)) {
        return parseInt(a.name) - parseInt(b.name)
      }
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    }).map(team => ({
      ...team,
      component:
        <TeamWorkshopInfoCard
          {...team}
          teamId={team.id}
          fsmId={fsmId}
          playerId={teamsRequests[team.id + '.' + fsmId]}
          toggleStar={toggleStar}
        />
    }))

  const nonReqTeams =
    teams.filter(
      (team) => !teamsRequests[team.id + '.' + fsmId]).sort((a, b) => {
        if (!isNaN(parseInt(a.name)) && !isNaN(parseInt(b.name)) && parseInt(b.name) !== parseInt(a.name)) {
          return parseInt(a.name) - parseInt(b.name)
        }
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
      }).map(team => ({
        ...team,
        component:
          <TeamWorkshopInfoCard
            {...team}
            teamId={team.id}
            fsmId={fsmId}
            toggleStar={toggleStar}
          />
      }))
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="همه تیم‌ها" {...a11yProps(0)} />
          <Tab label="تیم‌های نشان شده" {...a11yProps(1)} />
          <Tab label="درخواست‌ها" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TeamsTab reqTeams={reqTeams} nonReqTeams={nonReqTeams} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TeamsTab reqTeams={reqTeams.filter(team => team.isStarred)} nonReqTeams={nonReqTeams.filter(team => team.isStarred)} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TeamsTab reqTeams={reqTeams} nonReqTeams={[]} />
      </TabPanel>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  teamsRequests: state.programs.teamsRequests,
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TeamPropsType = {
  teamsRequests: string[],
  programTeams: TeamType[],
  getRequestMentor: Function,
  createRequestMentor: Function,
  removeRequestMentor: Function,
}
