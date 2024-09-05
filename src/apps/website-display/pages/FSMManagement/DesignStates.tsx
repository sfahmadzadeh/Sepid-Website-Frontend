import React, { FC, useEffect, useState } from 'react';
import {
  Stack,
  Skeleton,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import StatesMenu from 'commons/components/organisms/StatesMenu';
import EditableState from 'commons/components/template/EditableState';
import { useGetFSMStatesQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';

type DesignStatesPropsType = {}

const DesignStates: FC<DesignStatesPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [stateIndex, setStateIndex] = useState(0);
  const { data: fsmStates = [], isLoading, isSuccess } = useGetFSMStatesQuery({ fsmId });

  useEffect(() => {
    if (isSuccess) {
      setStateIndex(stateIndex => Math.max(0, Math.min(stateIndex, fsmStates.length - 1)));
    }
  }, [fsmStates])

  const finalStateIndex = Math.max(0, Math.min(stateIndex, fsmStates.length - 1));

  return (
    <Stack padding={2} spacing={4}>
      <StatesMenu
        stateIndex={stateIndex}
        setStateIndex={setStateIndex}
        states={fsmStates}
      />
      {(isLoading) ?
        <Skeleton variant="rounded" width={'100%'} height={600} /> :
        ((fsmStates[finalStateIndex]?.id) ?
          <EditableState fsmStateId={fsmStates[finalStateIndex].id} /> :
          <Typography variant='h2'>
            {'گامی وجود ندارد.'}
          </Typography>)
      }
    </Stack>
  );
};

export default DesignStates;