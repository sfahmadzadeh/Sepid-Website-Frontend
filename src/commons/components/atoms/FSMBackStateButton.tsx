import { Button } from '@mui/material';
import React, { FC, useContext } from 'react';

import { StatePageContext } from 'apps/website-display/pages/FSM';
import {
  useGoBackwardMutation,
  useMentorMoveBackwardMutation,
} from 'apps/website-display/redux/features/program/PlayerSlice';

type FSMBackStateButtonPropsType = {
  inwardEdges: any[];
  playerId: string;
}

const FSMBackStateButton: FC<FSMBackStateButtonPropsType> = ({
  inwardEdges = [],
  playerId,
}) => {
  const { isMentor, teamId } = useContext(StatePageContext);
  const [goBackward, goBackwardResult] = useGoBackwardMutation();
  const [mentorMoveBackward, mentorMoveBackwardResult] = useMentorMoveBackwardMutation();

  if (inwardEdges.length === 0) {
    return null;
  }

  const backEdge = inwardEdges[0];

  const handleClick = () => {
    if (isMentor) {
      mentorMoveBackward({
        playerId,
      });
    } else {
      if (backEdge.is_back_enabled) {
        goBackward({
          playerId: playerId,
        });
      }
    }
  };

  return (
    <Button
      disabled={!backEdge.is_back_enabled || goBackwardResult?.isLoading || mentorMoveBackwardResult?.isLoading}
      fullWidth
      variant="outlined"
      color="primary"
      onClick={handleClick}>
      قبلی
    </Button>
  );
}

export default FSMBackStateButton;