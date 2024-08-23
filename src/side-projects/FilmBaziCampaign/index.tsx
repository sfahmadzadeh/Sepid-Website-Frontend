import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from 'components/template/Layout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import FilmCard from './FilmCard';
import persianFilms from './SampleFilms';

type FilmBaziCampaignPropsType = {}

const FilmBaziCampaign: FC<FilmBaziCampaignPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

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
            <ProgramPageSidebar />
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

export default FilmBaziCampaign;