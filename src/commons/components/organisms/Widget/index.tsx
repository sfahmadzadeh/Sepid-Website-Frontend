import { Box, Divider, IconButton, Paper, Stack, Typography, Tooltip } from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Help as HelpIcon,
  Paid as PaidIcon,
} from '@mui/icons-material';
import React, { FC, Fragment, useMemo, useState } from 'react';

import DeleteWidgetDialog from 'commons/components/organisms/dialogs/DeleteWidgetDialog';
import EditHintsDialog from 'commons/components/organisms/dialogs/EditHintsDialog';
import WidgetHint from 'commons/components/molecules/WidgetHint';
import useWidgetFactory from './useWidgetFactory';
import CostDialog from '../dialogs/CostDialog';
import { AnswerType } from 'commons/types/models';
import { WidgetType } from 'commons/types/widgets/widget';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import CreateAttributeDialog from '../dialogs/CreateAttributeDialog';

export enum WidgetModes {
  Create,
  View,
  Edit,
  Review,
  InForm,
};

export enum WidgetTypes {
  SmallAnswerProblem = 'SmallAnswerProblem',
  BigAnswerProblem = 'BigAnswerProblem',
  UploadFileProblem = 'UploadFileProblem',
  MultiChoiceProblem = 'MultiChoiceProblem',
  InviteeUsername = 'InviteeUsername',
  TextWidget = 'TextWidget',
  DetailBoxWidget = 'DetailBoxWidget',
  Image = 'Image',
  Video = 'Video',
  Iframe = 'Iframe',
}

type WidgetPropsType = {
  widget: WidgetType;
  mode?: WidgetModes;
  paperId: string;
  coveredWithPaper?: boolean;
  collectAnswer?: any;
  submittedAnswer?: AnswerType;
}

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  coveredWithPaper = true,
  collectAnswer,
  submittedAnswer,
}) => {
  const [openAddAttributeDialog, setAddAttributeDialogOpen] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditHintDialog, setEditHintDialog] = useState(false);
  const [showCostDialog, setShowCostDialog] = useState(false);
  const [answerBody, setAnswerBody] = useState({});

  const {
    onDelete,
    onMutate,
    onAnswerChange,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
    skipFetch,
  } = useWidgetFactory({
    widgetId: widget.id.toString(),
    paperId,
    widgetType: widget.widget_type,
    mode,
    collectAnswer,
  });

  const beCorrected = (widget as QuestionWidgetType).be_corrected;
  const cost = null; // widget.cost;
  const reward = null; // widget.reward;

  const onSubmit = () => {
    onAnswerSubmit({ ...answerBody, onSuccess: () => setShowCostDialog(showCostDialog => !showCostDialog) });
  }

  let onAnswerSubmitWrapper;
  if (beCorrected && cost) {
    onAnswerSubmitWrapper = (body) => {
      setShowCostDialog(showCostDialog => !showCostDialog);
      setAnswerBody(body);
    }
  }

  const Cover = useMemo(() =>
    coveredWithPaper
      ? ({ children }) =>
        <Paper elevation={2} sx={{ padding: 1, width: '100%', height: '100%' }}>
          {children}
        </Paper>
      : ({ children }) =>
        <Fragment>
          {children}
        </Fragment>
    , [coveredWithPaper])

  return (
    <Fragment>
      <Cover>
        {mode === WidgetModes.Edit &&
          <Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='h3' gutterBottom>
                {widget.name}
              </Typography>
              <Box>
                {/* <Tooltip title='ویژگی‌ها' arrow>
                    <IconButton size='small' onClick={() => setAddAttributeDialogOpen(true)}>
                      <PaidIcon />
                    </IconButton>
                  </Tooltip> */}
                <Tooltip title='راهنمایی‌ها' arrow>
                  <IconButton size='small' onClick={() => setEditHintDialog(true)}>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='ویرایش' arrow>
                  <IconButton size='small' onClick={() => setOpenEditDialog(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='حذف' arrow>
                  <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
            <Box mb={2}>
              <Divider />
            </Box>
          </Stack>
        }
        {(mode === WidgetModes.View && widget?.hints?.length) ? <WidgetHint hints={widget.hints} /> : null}
        <WidgetComponent submittedAnswer={submittedAnswer} {...widget} mode={mode} onAnswerSubmit={onAnswerSubmitWrapper || onAnswerSubmit} onAnswerChange={onAnswerChange} />
      </Cover>
      {cost &&
        <CostDialog
          cost={cost}
          callBackFunction={onSubmit}
          open={showCostDialog}
          handleClose={() => setShowCostDialog(showCostDialog => !showCostDialog)}
        />
      }
      <CreateAttributeDialog
        open={openAddAttributeDialog}
        handleClose={() => setAddAttributeDialogOpen(!openAddAttributeDialog)}
      />
      <EditWidgetDialog
        {...widget}
        paperId={paperId}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        onMutate={onMutate}
      />
      <DeleteWidgetDialog
        widgetId={widget.id}
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        onDelete={onDelete}
      />
      <EditHintsDialog
        paperId={paperId}
        hints={widget.hints}
        referenceId={widget.id}
        open={openEditHintDialog}
        handleClose={() => setEditHintDialog(false)}
      />
    </Fragment>
  );
};

export default Widget;
