import React from 'react';

import ChatRoomButton from '../components/ChatRoomButton';
import MentorButton from '../components/MentorButton';
import ReviewAnswersButton from '../components/ReviewAnswersButton';
import TeamAvatar from '../components/TeamAvatar';
import WhiteboardButton from '../components/WhiteboardButton';
import ScoresDialogButton from '../components/ScoresDialogButton';
import DashboardButton from '../components/DashboardButton';
import FSMLogoButton from '../components/FSMLogoButton';
import UserInfo from '../components/UserInfo';
import UserAvatar from '../components/UserAvatar';
import { useParams } from 'react-router-dom';

const FSMAppbarItems = ({ program, fsm }) => {
  const { programId } = useParams();

  const reviewAnswers = <ReviewAnswersButton />
  const chatRoomButton = <ChatRoomButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const userAvatar = <UserAvatar />
  const teamAvatar = <TeamAvatar />;
  const fsmLogoButton = <FSMLogoButton />;
  const scoresDialogButton = <ScoresDialogButton />
  const backToProgram = <DashboardButton label={'بازگشت به دوره'} to={`/program/${programId}/`} />;

  const desktopLeftItems = [];
  const desktopRightItems = [fsmLogoButton];
  const mobileLeftItems = [];
  const mobileRightItems = [fsmLogoButton];
  const mobileMenuListItems = [];
  const toolbarItems = [];

  if (fsm?.first_state?.is_exam) {
    toolbarItems.push(reviewAnswers);
  }

  if (program?.show_scores) {
    toolbarItems.push(scoresDialogButton);
  }

  if (fsm?.fsm_learning_type == 'Supervised') {
    toolbarItems.push(mentorButton)
  }

  if (fsm?.fsm_learning_type == 'Supervised' || fsm?.fsm_p_type == 'Team') {
    toolbarItems.push(whiteboardButton, chatRoomButton)
  }

  if (fsm?.fsm_p_type == 'Team') {
    desktopLeftItems.push(teamAvatar);
  } else {
    desktopLeftItems.push(userAvatar);
  }

  desktopLeftItems.push(backToProgram);
  mobileLeftItems.push(backToProgram);

  return {
    toolbarItems,
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default FSMAppbarItems;
