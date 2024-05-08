import {
  Stack,
  Typography,
  Box,
} from '@mui/material';
import React, { FC, useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import StatesTabbar from 'components/organisms/StatesTabbar';
import {
  getAllWorkshopStatesInfoAction,
} from 'redux/slices/workshop';
import {
  getOneStateAction,
} from 'redux/slices/Paper';
import { State } from 'types/models';
import EditState from 'components/template/EditState';


type DesignStatesPropsType = {
  getAllWorkshopStatesInfo: Function;
  getOneState: Function;
  papers: {};
  allStates: State[];
}

const DesignStates: FC<DesignStatesPropsType> = ({
  getAllWorkshopStatesInfo,
  getOneState,
  allStates = [],
  papers,
}) => {
  const { fsmId } = useParams();
  const [tab, setTab] = useState(0);
  const currentState = papers[allStates[tab]?.id];

  useEffect(() => {
    getAllWorkshopStatesInfo({ fsmId });
  }, []);

  useEffect(() => {
    if (allStates[tab]) {
      getOneState({ paperId: allStates[tab].id });
    }
  }, [allStates, tab]);

  const widgets = currentState?.widgets;
  const hints = currentState?.hints;

  return (
    <Stack >
      <StatesTabbar
        value={tab}
        setValue={setTab}
        tabs={allStates.map((state) => state.name)}
      />
      <Box padding={2} paddingTop={4}>
        {currentState ?
          <EditState {...currentState} />
          :
          <Typography align="center" variant="h3" gutterBottom>
            {'گامی وجود ندارد.'}
          </Typography>
        }
      </Box>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  allStates: state.workshop.allStates,
  papers: state.paper.papers,
});

export default connect(mapStateToProps, {
  getOneState: getOneStateAction,
  getAllWorkshopStatesInfo: getAllWorkshopStatesInfoAction,
})(DesignStates);
