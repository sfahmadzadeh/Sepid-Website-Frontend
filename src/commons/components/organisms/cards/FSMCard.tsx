import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import React, { useState, Fragment, FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import EnterFSMPasswordDialog from 'commons/components/organisms/dialogs/EnterFSMPasswordDialog';
import { FSMType, FSMUserPermissions } from 'commons/types/models';
import { useEnterFSMMutation } from 'apps/website-display/redux/features/program/PlayerSlice';

type FSMCardPropsType = {
  fsm: Partial<FSMType>;
  isLoading?: boolean;
  userPermissions?: FSMUserPermissions;
}

export const FSMCard: FC<FSMCardPropsType> = ({
  fsm,
  isLoading = false,
  userPermissions,
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const [openPassword, setOpenPassword] = useState(false);
  const [enterFSM, result] = useEnterFSMMutation();

  useEffect(() => {
    if (result.isSuccess)
      navigate(`fsm/${fsm.id}/`)
  }, [result])

  const handleEnterFSM = ({ fsmId }) => {
    if (!result.isLoading) {
      enterFSM({ fsmId });
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
      }}>
      <Box sx={{ alignItems: 'center' }}>
        {isLoading ?
          <Skeleton
            width='100%'
            animation="wave"
            variant="rectangular"
            sx={{ minHeight: 300 }}
          /> :
          <Fragment>
            <Stack /* this stack holds the header of each teams card */
              direction="row"
              sx={{
                padding: "10px",
                background: '#eee',
                height: "40px",
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center'
              }}>

              <Stack direction='row' alignSelf='center' marginTop='7px'>
                <Box marginLeft='5px' marginRight='5px'>{fsm?.has_entrance_lock ? <Lock /> : <LockOpen />}</Box>
                {fsm?.fsm_p_type &&
                  <Typography>{fsm.fsm_p_type == 'Team' ? 'تیمی' : 'فردی'}</Typography>
                }
              </Stack>

              <Box>
                {userPermissions?.is_mentor ?
                  <Tooltip title='ورود به بخش همیاران' arrow>
                    <IconButton component={Link} to={`/program/${programSlug}/fsm/${fsm?.id}/manage/`} >
                      <ModeEditTwoToneIcon />
                    </IconButton>
                  </Tooltip> :
                  <Box />
                }
              </Box>
            </Stack>
            {fsm.cover_page &&
              <CardMedia
                sx={{ minHeight: 300 }}
                image={fsm.cover_page}
                title={fsm.name}
              />
            }
          </Fragment>
        }
        <CardContent>
          {isLoading ? (
            <Fragment>
              <Skeleton
                animation="wave"
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width='100%' />
            </Fragment>
          ) : (
            <Stack justifyContent={'space-between'}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                <Typography gutterBottom variant="h4" component="h2">
                  {fsm.name}
                </Typography>
              </Stack>
              <Typography variant="body2" color="textSecondary" component="p">
                {fsm.description}
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Box>
      <CardActions>
        {!isLoading &&
          <Button
            disabled={isLoading || !fsm?.is_active}
            size="large"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={
              fsm.id ?
                fsm?.has_entrance_lock
                  ? () => setOpenPassword(true)
                  : () => handleEnterFSM({ fsmId: fsm.id })
                : null
            }>
            {'بزن بریم!'}
          </Button>
        }
      </CardActions>
      <EnterFSMPasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={fsm?.id}
      />
    </Card>
  );
};

export default FSMCard;