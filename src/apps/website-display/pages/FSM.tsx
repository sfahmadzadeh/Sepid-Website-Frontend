import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { initParseServer } from 'apps/website-display/parse/init';
import FSMState from 'commons/components/template/FSMState';
import { createTeamState, getChangeTeamStateSubscription, getTeamState } from '../parse/team';
import {
  changeOpenChatRoomAction,
} from 'apps/website-display/redux/slices/currentState';
import { addMentorToRoom, updateMentorTime } from 'apps/website-display/parse/mentorsInRoom';
import DraggableChatRoom from 'commons/components/organisms/DraggableMeeting';
import Layout from 'commons/components/template/Layout';
import { TeamType } from 'commons/types/models';
import { toast } from 'react-toastify';
import { useGetFSMQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import {
  useGetPlayerQuery,
  useGetCurrentUserFSMPlayerQuery,
} from 'apps/website-display/redux/features/program/PlayerSlice';

var moment = require('moment');

export const StatePageContext = React.createContext<any>({});

type FSMPagePropsType = {
  mentorGetCurrentState: any;
  // todo:
  teamRoom: any;
  openChatRoom: any;
  changeOpenChatRoom: any;
  personsName: string;
  mentorId: string;
  teamId: string;
}

const FSM: FC<FSMPagePropsType> = ({
  mentorGetCurrentState,
  // todo:
  teamRoom,
  openChatRoom,
  changeOpenChatRoom,
  personsName,
  mentorId,
  teamId,
}) => {
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const subscriberRef = useRef(null);
  const [mentorAdded, setMentorAdded] = useState(false)
  const search = useLocation().search;
  const { data: currentUserPlayer, refetch: refetchCurrentUserFSMPlayer } = useGetCurrentUserFSMPlayerQuery({ fsmId });
  let teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || currentUserPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  teamId = new URLSearchParams(search).get('teamId') || teamId

  let readyToAddMentor = false
  if (teamId !== undefined && mentorId !== undefined && personsName !== undefined) {
    readyToAddMentor = true
  }

  useEffect(() => {
    if (fsm?.fsm_learning_type === 'Supervised' || fsm?.fsm_p_type === 'Team') {
      initParseServer();
    }
  }, [fsm]);

  // useEffect(() => {
  //   let updateInterval
  //   if (!mentorAdded && isMentor && readyToAddMentor) {
  //     addMentorToRoom(teamId, mentorId.toString(), personsName)
  //     setMentorAdded(true)
  //     updateMentorTime(teamId, mentorId.toString())
  //     updateInterval = setInterval(() => { updateMentorTime(teamId, mentorId.toString()) }, 10000)
  //   }
  //   return (
  //     () => {
  //       if (updateInterval) {
  //         clearInterval(updateInterval)
  //       }
  //     }
  //   )
  // }, [isMentor, readyToAddMentor])

  const [parseTeamStateId, setParseTeamStateId] = useState(null);

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamStateId(teamState.get('stateId'));

  useEffect(() => {
    if (!player?.current_state?.id || !parseTeamStateId) return;
    if (+parseTeamStateId !== +player?.current_state.id) {
      if (isMentor) {
        toast.info('یکی از دانش‌آموزان مکان تیم رو جا‌به‌جا کرد');
        mentorGetCurrentState({ id: teamHeadPlayerId });
      } else {
        // با حرکت خود بازیکن هم، اینجا اجرا میشه!‌ نباید اینطوری باشه
        // toast.info('جابه‌جا شدید');
        refetchCurrentUserFSMPlayer();
      }
    }
  }, [parseTeamStateId]);

  useEffect(() => {
    if (!teamId || !player?.current_state) return;
    const subscribe = async (teamId) => {
      const teamState = await getTeamState(teamId)
      if (!teamState) {
        await createTeamState(teamId, player?.current_state.toString(), player?.current_state.name, moment().format('HH:mm:ss'))
      }
      const subscriber = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscriber.on('create', onUpdateStateFromParse);
      subscriber.on('update', onUpdateStateFromParse);
      subscriberRef.current = subscriber;
    }
    subscribe(teamId);
    return () => {
      subscriberRef.current?.unsubscribe();
    }
  }, [teamId, player]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [player])

  if (!player || !fsm) return null;

  return (
    <Fragment>
      {fsm &&
        <Helmet>
          <title>{fsm.name}</title>
        </Helmet>
      }
      <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
        <FSMState type='workshop' stateId={player.current_state} playerId={player.id} />
      </Layout>
      {(fsm.fsm_p_type == 'Team' || fsm.fsm_learning_type == 'Supervised') &&
        <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
      }
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  openChatRoom: state.currentState.openChatRoom,
  teamRoom: state.currentState.teamRoom,
  myTeam: state.currentState.myTeam,
  currentState: state.currentState.fsmState,
  needUpdateState: state.currentState.needUpdateState,
  studentPlayerId: state.currentState.playerId,
  teamId: state.currentState.teamId,
  personsName: `${state.account.userInfo?.first_name} ${state.account.userInfo?.last_name}`,
  mentorId: state.account.userInfo?.id,
});

export default connect(mapStateToProps, {
  changeOpenChatRoom: changeOpenChatRoomAction,
})(FSM);
