import { Box, Divider, Grid, Paper, Typography, Stack } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import Widget from 'commons/components/organisms/Widget';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMStateRoadMap from 'commons/components/organisms/FSMStateRoadMap';
import FSMStateHelpButton from 'commons/components/molecules/FSMStateHelpButton';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';

export type WorkshopFSMStatePropsType = {
  type: 'workshop'; // | 'exam' | 'form' | 'game' | 'roadmap';
  stateId: string;
  playerId: string;
}

const WorkshopFSMState: FC<WorkshopFSMStatePropsType> = ({ stateId, playerId }) => {
  const { data: paper } = useGetPaperQuery({ paperId: stateId }, { skip: !stateId });
  const { data: state } = useGetFSMStateQuery({ fsmStateId: stateId })

  const visibleWidgets = paper?.widgets.filter(widget => !widget.is_hidden) || []
  const hints = [...(state?.hints || [])];
  const inward_edges = state?.inward_edges || [];
  const outward_edges = state?.outward_edges || [];

  hints.sort((a, b) => a.id - b.id);
  visibleWidgets.sort((a, b) => a.id - b.id);

  const questions = visibleWidgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(() =>
    questions.map((widget, index) => (
      <Stack key={widget.id}>
        <Divider style={{ marginBottom: 20 }} />
        <Widget paperId={stateId} coveredWithPaper={false} key={widget.id} widget={widget} />
      </Stack>
    )), [questions]);

  const notQuestions = visibleWidgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  const notQuestionWidgets = useMemo(() =>
    notQuestions.map((widget) => (
      <Stack key={widget.id}>
        <Widget paperId={stateId} coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [notQuestions]);

  return (
    <Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
        <Grid
          item xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 8}
          position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack spacing={2}>
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }} position={'relative'}>
              <Box sx={{ position: 'absolute', left: -26, top: -24, rotate: '24deg' }}>
                <FSMStateHelpButton hints={hints} />
              </Box>
              <Typography component="h2" variant="h3" align='center' alignSelf={'center'}>
                {state?.name}
              </Typography>
              {questionWidgets}
              {!(inward_edges?.length === 0 && outward_edges?.length === 0) &&
                <Divider sx={{ display: { xs: 'none', md: 'inherit' } }} />
              }
              <Stack sx={{ display: { xs: 'none', md: 'inherit' } }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <FSMNextStateButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
            {state &&
              <FSMStateRoadMap currentNodeName={state?.name} playerId={playerId} />
            }
            {notQuestions.length === 0 &&
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <FSMNextStateButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            }
          </Stack>
        </Grid>
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack spacing={2}>
              <Stack component={Paper} sx={{ padding: 1 }} spacing={1}>
                {notQuestionWidgets}
              </Stack>
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <FSMNextStateButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid >
    </Fragment>
  );
}

export default WorkshopFSMState;
