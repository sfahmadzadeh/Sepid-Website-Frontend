import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useWidth from 'utils/UseWidth';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

function ProgramLogo({ }) {
  const { programId } = useParams();
  const width = useWidth();
  const { data: program } = useGetProgramQuery({ programId });

  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Tooltip title={program?.name} arrow>
        <IconButton disabled={width !== 'xs'} component={Link} to={`/program/${programId}/`}>
          <img
            src={program?.cover_page}
            alt='course-logo'
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
      <Button component={Link} to={`/program/${programId}/`}>
        <Typography
          fontSize={20} color={'black'}
          maxWidth={{ xs: 100, sm: 200, md: 300 }} whiteSpace={'nowrap'}
          overflow={'hidden'} textOverflow={'ellipsis'}>
          {program?.name}
        </Typography>
      </Button>
    </Stack>
  );
}


export default ProgramLogo;
