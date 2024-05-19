import {
  Divider,
  Paper,
  Typography,
  Box,
  Collapse,
  IconButton,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import RoadMapType1 from 'components/organisms/RoadMap/RoadMapType1';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {
  getPlayerTransitedPathAction,
  getFSMRoadmapAction,
} from 'redux/slices/Roadmap';
import { connect } from 'react-redux';
import { FSMRoadmapType, Link } from 'types/redux/Roadmap';

type FSMStateRoadMapPropsType = {
  currentNodeName: string;
  playerTransitedPath: Link[];
  FSMRoadmap: FSMRoadmapType;
  playerId: number;
  fsmId: number;
  getPlayerTransitedPath: any;
  getFSMRoadmap: any;
};

const FSMStateRoadMap: FC<FSMStateRoadMapPropsType> = ({
  currentNodeName,
  playerTransitedPath: fetchedPlayerTransitedPath,
  FSMRoadmap,
  playerId,
  fsmId,
  getPlayerTransitedPath,
  getFSMRoadmap,
}) => {
  const [openRoadMap, setOpenRoadMap] = useState(true);
  const [lastTransitedNode, setLastTransitedNode] = useState<string>(null);
  const [playerTransitedPath, setPlayerTakenPath] = useState<Link[]>([]);

  useEffect(() => {
    getPlayerTransitedPath({ player_id: playerId });
    getFSMRoadmap({ fsm_id: fsmId });
  }, [])

  useEffect(() => {
    setLastTransitedNode(currentNodeName);
    setPlayerTakenPath(fetchedPlayerTransitedPath);
  }, [fetchedPlayerTransitedPath])

  useEffect(() => {
    if (currentNodeName !== lastTransitedNode) {
      setPlayerTakenPath([...playerTransitedPath, ({ source: lastTransitedNode, target: currentNodeName })]);
      setLastTransitedNode(currentNodeName);
    }
  }, [currentNodeName])

  return (
    <Box component={Paper}>
      <Typography variant='h4' padding={1}>
        <IconButton onClick={() => setOpenRoadMap(!openRoadMap)}>
          <ArrowDropDownCircleIcon sx={{ transform: openRoadMap ? 'rotate(-180deg)' : null }} />
        </IconButton>
        {'نقشه راه'}
      </Typography>
      <Collapse in={openRoadMap}>
        <Divider />
        {(!FSMRoadmap || !fetchedPlayerTransitedPath)
          ? <Skeleton variant='rectangular' height={200} sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
          : <RoadMapType1 currentNodeId={currentNodeName} firstStateName={FSMRoadmap.firstStateName} links={FSMRoadmap.links} highlighedPath={playerTransitedPath} />
        }
      </Collapse>
    </Box>
  );
};

const mapStatesToProps = (state) => ({
  playerTransitedPath: state.Roadmap.playerTransitedPath,
  FSMRoadmap: state.Roadmap.FSMRoadmap,
});

export default connect(mapStatesToProps, {
  getPlayerTransitedPath: getPlayerTransitedPathAction,
  getFSMRoadmap: getFSMRoadmapAction,
})(FSMStateRoadMap);
