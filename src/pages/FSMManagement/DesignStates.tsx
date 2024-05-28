import React, { FC, useState } from 'react';
import {
  Stack,
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router';
import StatesMenu from 'components/organisms/StatesMenu';
import EditState from 'components/template/EditState';
import { useGetFSMStatesQuery } from 'redux/features/fsm/FSMSlice';

type DesignStatesPropsType = {}

const DesignStates: FC<DesignStatesPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [stateIndex, setStateIndex] = useState(0);
  const { data: fsmStates = [], isLoading } = useGetFSMStatesQuery({ fsmId });

  return (
    <Stack padding={2} spacing={4}>
      <StatesMenu
        stateIndex={stateIndex}
        setStateIndex={setStateIndex}
        states={fsmStates}
      />
      {(isLoading || stateIndex === -1) ?
        <Skeleton variant="rounded" width={'100%'} height={600} /> :
        <EditState fsmStateId={fsmStates[stateIndex].id} />
      }
    </Stack>
  );
};

export default DesignStates;