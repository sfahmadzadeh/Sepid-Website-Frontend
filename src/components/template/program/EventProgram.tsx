import { Box, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import FSMsGrid from 'components/organisms/FSMsGrid';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';
import Layout from 'components/template/Layout';

type EventProgramPropsType = {}

const EventProgram: FC<EventProgramPropsType> = ({ }) => {
  const { programId } = useParams();
  const { data: program } = useGetProgramQuery({ programId });
  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  return (
    <Fragment>
      {pageMetadata && program &&
        <Helmet>
          <title>{pageMetadata.header_data.title + ' | ' + program.name}</title>
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
              {'کارگاه‌ها'}
            </Typography>
            <FSMsGrid programId={programId} />
          </Stack>
        </Stack>
      </Layout>
    </Fragment>
  );
}

export default EventProgram;
