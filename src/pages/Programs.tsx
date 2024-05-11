import { Divider, Grid, Typography, Stack } from '@mui/material';
import React from 'react';
import ProgramCard from 'components/organisms/cards/ProgramCard';
import Layout from 'components/template/Layout';
import { ProgramType } from 'types/models';
import ProgramSkeletonCard from 'components/organisms/cards/EventSkeletonCard';
import Banner from 'components/molecules/Banner';
import { useGetProgramsQuery } from 'redux/features/ProgramSlice';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import NoDataFound from 'components/molecules/NoDataFound';


const Programs = ({ }) => {
  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  const banners = pageMetadata?.banners;

  const {
    data,
    isLoading,
    isSuccess,
  } = useGetProgramsQuery({ websiteName: website?.name, isPrivate: false }, { skip: !Boolean(website) });
  const programs = data?.programs.filter(program => program.is_visible) || [];
  const count = data?.count || 0;

  const activePrograms: ProgramType[] = programs.filter((program: ProgramType) => program.is_active).sort((program1: ProgramType, program2: ProgramType) => program2.id - program1.id)
  const inactivePrograms: ProgramType[] = programs.filter((program: ProgramType) => !program.is_active).sort((program1: ProgramType, program2: ProgramType) => program2.id - program1.id)

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
          <ProgramSkeletonCard />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Layout appbarMode='DASHBOARD'>
      <Stack width={'100%'} spacing={4} justifyContent='center'>
        <Banner banners={banners} />
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
