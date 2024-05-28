import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Save as SaveIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useParams } from 'react-router';
import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import { EditPaper } from './Paper';
import EditHints from './EditHints';
import { useDeleteFSMStateMutation, useGetFSMStateQuery, useUpdateFSMStateMutation } from 'redux/features/fsm/FSMStateSlice';

type EditStatePropsType = {
  fsmStateId: string;
}

const EditState: FC<EditStatePropsType> = ({
  fsmStateId,
}) => {
  const { fsmId } = useParams()
  const [openCreateProblemDialog, setOpenCreateProblemDialog] = useState(false);
  const [openCreateContentDialog, setOpenCreateContentDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [newName, setNewName] = useState<string>(null);
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const [deleteFSMState] = useDeleteFSMStateMutation();
  const [updateFSMState] = useUpdateFSMStateMutation();

  const problems = fsmState?.widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  ) || [];
  const contents = fsmState?.widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  ) || [];
  const hints = fsmState?.hints || [];

  return (
    <Fragment>
      <Stack spacing={2}>
        {fsmStateId &&
          <Stack direction='row' alignItems='flex-start' justifyContent='space-between'>
            {isEditingStateName &&
              <TextField
                onChange={(e) => setNewName(e.target.value)}
                fullWidth variant='outlined'
                defaultValue={fsmState?.name} />
            }
            {!isEditingStateName &&
              <Typography align="center" variant="h1" gutterBottom>
                {fsmState?.name}
              </Typography>
            }
            <Stack direction='row'>
              {isEditingStateName &&
                <Tooltip title='ذخیره' arrow>
                  <IconButton size='small'
                    onClick={() => {
                      updateFSMState({
                        fsmStateId,
                        name: newName,
                        fsm: fsmId,
                        onSuccess: () => setIsEditingStateName(false),
                      });
                    }}>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              }
              {!isEditingStateName &&
                <Tooltip title='ویرایش نام گام' arrow>
                  <IconButton size='small' onClick={() => setIsEditingStateName(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title='حذف گام' arrow>
                <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        }
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        <EditPaper widgets={problems} paperId={+fsmStateId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditPaper widgets={contents} paperId={+fsmStateId} mode='contents' />
        <EditHints hints={hints} referenceId={fsmStateId} />
      </Stack >
      <CreateWidgetDialog
        showProblems={true}
        showContent={false}
        paperId={+fsmStateId}
        open={openCreateProblemDialog}
        handleClose={() => setOpenCreateProblemDialog(false)}
      />
      <CreateWidgetDialog
        paperId={+fsmStateId}
        open={openCreateContentDialog}
        handleClose={() => setOpenCreateContentDialog(false)}
      />
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => deleteFSMState({ fsmStateId })}
      />
    </Fragment>
  );
}

export default EditState;
