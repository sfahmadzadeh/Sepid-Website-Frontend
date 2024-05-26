import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import useWidth from 'utils/UseWidth';
import LogoSkeleton from './LogoSkeleton';
import { useGetFSMQuery } from 'redux/features/FSMSlice';
import { useParams } from 'react-router-dom';

type FSMLogoPropsType = {}

const FSMLogo: FC<FSMLogoPropsType> = ({ }) => {
  const width = useWidth();
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  if (!fsm) {
    return <LogoSkeleton />
  }

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <Tooltip title={fsm.name} arrow>
        <IconButton disabled={width !== 'xs'} sx={{ padding: 0 }}>
          <img
            src={fsm.cover_page}
            alt='logo'
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
              height: 40,
              width: 40,
              border: '1px solid #00000099',
            }}
          />
        </IconButton>
      </Tooltip>
      <Typography
        fontSize={20} color={'black'}
        maxWidth={{ xs: 120, sm: 240, md: 360 }} whiteSpace={'nowrap'}
        overflow={'hidden'} textOverflow={'ellipsis'}>
        {fsm.name}
      </Typography>
    </Stack>
  );
}

export default FSMLogo;
