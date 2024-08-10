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
import RoadMapType1 from 'components/organisms/Roadmap/RoadMapType1';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Link } from 'types/redux/Roadmap';
import { useGetFSMRoadmapActionQuery, useGetPlayerTransitedPathQuery } from 'redux/features/roadmap/RoadmapSlice';
import { useParams } from 'react-router-dom';

type FSMStateRoadMapPropsType = {
  currentNodeName: string;
  playerId: string;
};

const FSMStateRoadMap: FC<FSMStateRoadMapPropsType> = ({
  currentNodeName,
  playerId,
}) => {
  const { fsmId } = useParams();
  const [openRoadMap, setOpenRoadMap] = useState(true);
  const [lastTransitedNode, setLastTransitedNode] = useState<string>(currentNodeName);
  const [playerTransitedPath, setPlayerTransitedPath] = useState<Link[]>([]);
  const { data: FSMRoadmap } = useGetFSMRoadmapActionQuery({ fsmId });
  const { data: initialPlayerTransitedPath } = useGetPlayerTransitedPathQuery({ playerId });

  useEffect(() => {
    if (initialPlayerTransitedPath) {
      setPlayerTransitedPath(initialPlayerTransitedPath);
    }
  }, [initialPlayerTransitedPath])

  useEffect(() => {
    if (currentNodeName !== lastTransitedNode) {
      setPlayerTransitedPath([...playerTransitedPath, ({ source: lastTransitedNode, target: currentNodeName })]);
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
        {(!FSMRoadmap || !initialPlayerTransitedPath)
          ? <Skeleton variant='rectangular' height={200} sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
          : <RoadMapType1 currentNodeId={currentNodeName} firstStateName={FSMRoadmap.firstStateName} links={FSMRoadmap.links} highlightedPath={playerTransitedPath} />
        }
      </Collapse>
    </Box>
  );
};

export default FSMStateRoadMap;