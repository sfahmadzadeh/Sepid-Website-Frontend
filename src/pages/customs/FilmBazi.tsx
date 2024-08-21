import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';

import FSMsGrid from 'components/organisms/FSMsGrid';
import Layout from 'components/template/Layout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';
import FilmCard from './FilmCard';
import persianFilms from './SampleFilms';

type FilmBaziPropsType = {}

const FilmBazi: FC<FilmBaziPropsType> = ({ }) => {
  const programId = '17';
  const navigate = useNavigate();
  const { data: program } = useGetProgramQuery({ programId });
  const { data: website } = useGetWebsiteQuery();
  const {
    data: registrationReceipt,
    isSuccess: isGettingRegistrationReceiptSuccess,
    isFetching: isGettingRegistrationReceiptFetching,
  } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  useEffect(() => {
    if (isGettingRegistrationReceiptSuccess) {
      if (!isGettingRegistrationReceiptFetching && !registrationReceipt?.is_participating) {
        navigate(`/program/${programId}/form/`);
      }
    }
  }, [registrationReceipt])

  if (!registrationReceipt?.is_participating) {
    return null;
  }

  if (!program) {
    return (
      <>loading...</>
    );
  }

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{program.name}</title>
        </Helmet>
      }
      <Layout appbarMode='PROGRAM'>
        <Stack width={'100%'} direction={{ xs: 'column', sm: 'row' }} alignItems='flex-start' spacing={2}>
          <Box width={{ xs: '100%', sm: '25%', md: '20%' }} position={{ xs: null, sm: 'sticky' }} top={16}>
            <ProgramPageSidebar programId={programId} />
          </Box>
          <Stack width={{ xs: '100%', sm: '75%', md: '80%' }} spacing={2}>
            {/* <Banner banners={pageMetadata?.banners} /> */}
            <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
              {'فیلم‌های شهر شما'}
            </Typography>
            <Stack>
              <Grid container spacing={2}>
                {persianFilms.map((film) => (
                  <Grid item xs={12} sm={6} md={4} key={film.filmName}>
                    <FilmCard
                      filmName={film.filmName}
                      releasedCities={film.releasedCities}
                      picture={film.picture}
                      director={film.director}
                      description={film.description}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Layout>
    </Fragment>
  );
}

export default FilmBazi;