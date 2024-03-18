import { Box, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import FSMsGrid from 'components/organisms/FSMsGrid';
import {
  getEventWorkshopsAction,
  getOneEventInfoAction,
} from 'redux/slices/events';
import Layout from 'components/template/Layout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import Banner from 'components/molecules/Banner';
import { useGetPageMetadataQuery, useGetPartyQuery } from 'redux/features/PartySlice';

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
  getEventWorkshops,
  getOneEventInfo,

  program,
  isLoading,
  fsms,
  fsmsCount,
}) => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const { data: party } = useGetPartyQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ partyUuid: party?.uuid, pageAddress: window.location.pathname }, { skip: !Boolean(party) });

  const banners = pageMetadata?.banners || [];

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (program?.is_user_participating != undefined && !program?.is_user_participating) {
      navigate(`/program/${programId}/registration/`);
    }
  }, [program])

  useEffect(() => {
    getEventWorkshops({ programId, pageNumber });
  }, [pageNumber]);

  // todo: handle event not found
  // todo: handle in a better way  
  if (program?.is_user_participating == undefined) {
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
            <Banner banners={banners} />
            <Typography component="h1" fontWeight={700} fontSize={32} gutterBottom>
              {'کارگاه‌ها'}
            </Typography>
            <Stack>
              <FSMsGrid
                fsms={fsms}
                isLoading={isLoading}
              />
            </Stack>
            {(!isLoading && fsms.length > 0) &&
              <Pagination
                variant="outlined"
                color="primary"
                shape='rounded'
                count={Math.ceil(fsmsCount / ITEMS_PER_PAGE_NUMBER)}
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
  getEventWorkshops: getEventWorkshopsAction,
  getOneEventInfo: getOneEventInfoAction,
})(Program);
