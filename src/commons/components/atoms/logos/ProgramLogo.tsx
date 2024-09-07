import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useWidth from 'commons/utils/UseWidth';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

function ProgramLogo({ }) {
  const { programSlug } = useParams();
  const width = useWidth();
  const { data: program } = useGetProgramQuery({ programSlug: programSlug });

  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Tooltip title={program?.name} arrow>
        <IconButton disabled={width !== 'xs'} component={Link} to={`/program/${programSlug}/`}>
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
      <Button component={Link} to={`/program/${programSlug}/`}>
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
