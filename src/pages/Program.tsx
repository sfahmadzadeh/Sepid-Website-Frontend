import { Box, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import FSMsGrid from 'components/organisms/FSMsGrid';
import Layout from 'components/template/Layout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { data: program } = useGetProgramQuery({ programId });
  const { data: website } = useGetWebsiteQuery();
  const {
    data: registrationReceipt,
    isSuccess: isFetchingRegistrationReceiptSuccessful,
  } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  useEffect(() => {
    if (isFetchingRegistrationReceiptSuccessful && !registrationReceipt.is_participating) {
      navigate(`/program/${programId}/form/`);
    }
  }, [registrationReceipt])

  if (!registrationReceipt?.is_participating) {
    return null;
  }
  
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
            <ProgramPageSidebar />
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

export default Program;
