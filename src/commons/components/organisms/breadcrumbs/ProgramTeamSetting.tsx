import React from 'react';
import { Breadcrumbs, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100], // Light grey background
}));

const LargeBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-ol': {
    alignItems: 'center',
  },
  '& .MuiBreadcrumbs-li': {
    fontSize: '1.2rem',
  },
  '& .MuiBreadcrumbs-separator': {
    fontSize: '1.5rem',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const LargeLink = styled(RouterLink)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    textDecoration: 'none',
  },
}));

const ProgramTeamSettingBreadcrumbs = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug: programSlug });

  return (
    <StyledPaper elevation={0}>
      <LargeBreadcrumbs aria-label="مسیر دسترسی" separator='>'>
        <LargeLink to={`/program/${program?.slug}/`}>
          {program?.name}
        </LargeLink>
        <Typography fontSize='1.2rem' color="text.primary" padding={(theme) => theme.spacing(0.5)}>
          {'تیم‌بندی'}
        </Typography>
      </LargeBreadcrumbs>
    </StyledPaper>
  );
};

export default ProgramTeamSettingBreadcrumbs;