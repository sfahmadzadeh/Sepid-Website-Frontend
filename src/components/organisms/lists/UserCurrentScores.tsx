import { Stack, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

type UserCurrentScoresPropsType = {
}

const UserCurrentScores: FC<UserCurrentScoresPropsType> = ({
}) => {
  const { programId } = useParams();
  const getCurrentScores = null;
  const scores = [];

  return (
    <Stack padding={2} spacing={4}>
      <Typography variant='h2' align='center' gutterBottom>
        {'امتیازات'}
      </Typography>
      {Object.entries(scores).length > 0 ?
        <Stack spacing={1}>
          {Object.entries(scores).map(([scoreType, scoreValue], index) => (
            <Stack direction={'row'} key={index} spacing={2} justifyContent={'space-between'}>
              <Typography>{scoreType}</Typography>
              <Typography>{scoreValue}</Typography>
            </Stack>
          ))}
        </Stack> :
        <Typography variant='h4' align='center'>
          {'هنوز امتیازی وجود ندارد'}
        </Typography>
      }
    </Stack>
  );
}

export default UserCurrentScores;
