import { Divider, Grid, Typography, Stack } from '@mui/material';
import React from 'react';
import ProgramCard from 'components/organisms/cards/ProgramCard';
import Layout from 'components/template/Layout';
import { ProgramType } from 'types/models';
import ProgramCardSkeleton from 'components/organisms/cards/ProgramCardSkeleton';
import Banner from 'components/molecules/Banner';
import { useGetProgramsQuery } from 'redux/features/program/ProgramSlice';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import NoDataFound from 'components/molecules/NoDataFound';

const Programs = ({ }) => {
  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });
  const {
    data: programsData,
    isLoading,
    isSuccess,
  } = useGetProgramsQuery({ websiteName: website?.name }, { skip: !Boolean(website) });
  const programs = programsData?.programs.filter(program => program.is_visible) || [];
  const visiblePrograms = programs.filter(program => program.is_visible)

  const activePrograms: ProgramType[] = visiblePrograms.filter((program: ProgramType) => program.is_active);
  const inactivePrograms: ProgramType[] = visiblePrograms.filter((program: ProgramType) => !program.is_active);

  const activeProgramsElement = (
    <Grid item container spacing={2} xs={12}>
      {(isSuccess && activePrograms.length === 0) ?
        <Grid container justifyContent={'center'}>
          <NoDataFound />
        </Grid> :
        activePrograms.map((program, index) => (
          <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
            <ProgramCard program={program} />
          </Grid>
        ))
      }
    </Grid>
  );

  const inactiveProgramsElement = (
    <Grid item container spacing={2} xs={12}>
      {(isSuccess && inactivePrograms.length === 0) ?
        <Grid container item justifyContent='center' alignItems='center'>
          <NoDataFound />
        </Grid> :
        inactivePrograms.map((program, index) => (
          <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
            <ProgramCard program={program} />
          </Grid>
        ))
      }
    </Grid>
  );

  const skeletonElements = (
    <Grid item container spacing={2} xs={12}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <ProgramCardSkeleton />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Layout appbarMode='DASHBOARD'>
      <Stack width={'100%'} spacing={4} justifyContent='center'>
        <Banner banners={pageMetadata?.banners} />
        <Typography variant="h1" align='center'>
          {'دوره‌‌ها'}
        </Typography>
        <Typography variant='h2' gutterBottom>
          {'دوره‌‌های در جریان'}
        </Typography>
        <Divider />
        <Grid container>
          {isLoading ? skeletonElements : activeProgramsElement}
        </Grid>
        <Typography variant='h2' gutterBottom>
          {'دوره‌‌های گذشته'}
        </Typography>
        <Divider />
        <Grid container>
          {isLoading ? skeletonElements : inactiveProgramsElement}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Programs;
