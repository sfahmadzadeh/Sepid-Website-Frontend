import { Box, Button, Grid, Paper, Tooltip, Typography, Divider, Stack, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import { toPersianNumber } from 'utils/translateNumber';
import { EditPaper } from './Paper';
import { useCreateFSMStateHintMutation, useCreateWidgetHintMutation, useDeleteFSMStateHintMutation, useDeleteWidgetHintMutation } from 'redux/features/hint/HintSlice';

type EditHintsPropsType = {
  type: 'widget' | 'state';
  hints: any[];
  referenceId: string;
  paperId: string;
}

const EditHints: FC<EditHintsPropsType> = ({
  type = 'state',
  referenceId,
  hints = [],
  paperId,
}) => {
  const t = useTranslate();
  const [hintId, setHintId] = useState<string>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<string>(null);
  const [createHint] = useCreateFSMStateHintMutation();
  const [deleteHint] = useDeleteFSMStateHintMutation();
  const [createWidgetHint] = useCreateWidgetHintMutation();
  const [deleteWidgetHint] = useDeleteWidgetHintMutation();

  return (
    <Stack spacing={2} width='100%'>
      <Typography variant="h2" gutterBottom>
        {'راهنمایی‌ها'}
      </Typography>
      <Divider />
      {hints?.length > 0 ?
        <Stack>
          <Grid container alignItems='stretch' spacing={2}>
            {hints.map((hint, index) => (
              <Grid item key={index} xs={12} md={6}>
                <Paper sx={{ padding: 1 }} key={hint.id} elevation={3}>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography>{t('helpNumber') + " " + toPersianNumber(index + 1)}</Typography>
                      <Box>
                        <Tooltip title='حذف راهنمایی' arrow>
                          <IconButton size='small' onClick={() => setDeleteDialogId(hint.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                    <EditPaper paperId={hint.id} />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
        :
        <Box mt={2}>
          <Typography variant='h4' align="center">{'موردی وجود ندارد!'}</Typography>
        </Box>
      }
      <Button
        fullWidth
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => type === 'state' ? createHint({ fsmStateId: referenceId }) : createWidgetHint({ paperId, widgetId: referenceId })}>
        {t('createHelp')}
      </Button>
      <CreateWidgetDialog
        paperId={hintId}
        open={!!hintId}
        handleClose={() => setHintId(null)}
      />
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(null)}
        callBackFunction={() => type === 'state' ? deleteHint({ fsmStateId: referenceId, hintId: deleteDialogId }) : deleteWidgetHint({ paperId, hintId: deleteDialogId })}
      />
    </Stack>
  );
}

export default EditHints;
