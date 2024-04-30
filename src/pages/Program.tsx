import { Box, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import FSMsGrid from 'components/organisms/FSMsGrid';
import {
  getOneEventInfoAction,
} from 'redux/slices/events';
import Layout from 'components/template/Layout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import Banner from 'components/molecules/Banner';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import { useGetFSMsQuery } from 'redux/features/FSMSlice';

type ProgramPropsType = {
  getEventWorkshops: any;
  getOneEventInfo: any;
  getBanners: any;

  program: any;
  isLoading: any;
  fsms: any;
  fsmsCount: number;
  banners: any;
}

const Program: FC<ProgramPropsType> = ({
  getOneEventInfo,

  program,
  isLoading,
}) => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: fsmsData,
  } = useGetFSMsQuery({ programId, pageNumber })

  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  const banners = pageMetadata?.banners || [];

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (program?.is_user_participating != undefined && !program?.is_user_participating) {
      navigate(`/program/${programId}/registration/`);
    }
  }, [program])

  // todo: handle event not found
  // todo: handle in a better way  
  if (program?.is_user_participating == undefined) {
    return;
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
            <Banner banners={banners} />
            <Typography component="h1" fontWeight={700} fontSize={32} gutterBottom>
              {'کارگاه‌ها'}
            </Typography>
            <Stack>
              <FSMsGrid
                fsms={fsmsData?.fsms}
                isLoading={isLoading}
              />
            </Stack>
            {(!isLoading && fsmsData?.fsms.length > 0) &&
              <Pagination
                variant="outlined"
                color="primary"
                shape='rounded'
                count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
                page={pageNumber}
                onChange={(e, value) => setPageNumber(value)}
              />
            }
          </Stack>
        </Stack>
      </Layout>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({
  fsms: state.events.workshops,
  isLoading: state.events.getWorkshopsLoading,
  program: state.events.event,
  fsmsCount: state.events.workshopsCount,
});

export default connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
})(Program);
