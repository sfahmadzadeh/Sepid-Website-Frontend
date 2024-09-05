import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Save as SaveIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import CreateWidgetDialog from 'commons/components/organisms/dialogs/CreateWidgetDialog';
import { EditPaper } from '../Paper';
import EditHints from '../EditHints';
import { useDeleteFSMStateMutation, useGetFSMStateQuery, useUpdateFSMStateMutation } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { toast } from 'react-toastify';

type EditableNormalStatePropsType = {
  fsmStateId: string;
}

const EditableNormalState: FC<EditableNormalStatePropsType> = ({
  fsmStateId,
}) => {
  const { fsmId } = useParams()
  const [openCreateProblemDialog, setOpenCreateProblemDialog] = useState(false);
  const [openCreateContentDialog, setOpenCreateContentDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [name, setName] = useState<string>(null);
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const [deleteFSMState] = useDeleteFSMStateMutation();
  const [updateFSMState, result] = useUpdateFSMStateMutation();

  useEffect(() => {
    if (fsmState) {
      setName(fsmState?.name);
    }
  }, [fsmState])

  const renameFSMState = () => {
    if (!name) {
      toast.error('نام گام نمی‌تواند خالی بماند.');
      return;
    }
    updateFSMState({
      fsmStateId,
      name: name,
      fsm: fsmId,
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setIsEditingStateName(false)
    }
  }, [result])

  return (
    <Fragment>
      <Stack spacing={2}>
        {fsmStateId &&
          <Stack direction='row' alignItems='flex-start' justifyContent='space-between'>
            {isEditingStateName &&
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth variant='outlined' />
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
                    onClick={renameFSMState}>
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
        <EditPaper paperId={fsmStateId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditPaper paperId={fsmStateId} mode='contents' />
        <Typography variant="h2" gutterBottom>
          {'راهنمایی‌ها'}
        </Typography>
        <Divider />
        <EditHints paperId={fsmStateId} hints={fsmState?.hints} type='state' referenceId={fsmStateId} />
      </Stack >
      <CreateWidgetDialog
        showProblems={true}
        showContent={false}
        paperId={fsmStateId}
        open={openCreateProblemDialog}
        handleClose={() => setOpenCreateProblemDialog(false)}
      />
      <CreateWidgetDialog
        paperId={fsmStateId}
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

export default EditableNormalState;
