import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import MakeInvitation from 'commons/components/organisms/dialogs/MakeInvitation';
import Layout from 'commons/components/template/Layout';
import RespondInvitation from 'commons/components/molecules/RespondInvitation';
import { toast } from 'react-toastify';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import ProgramTeamSettingBreadcrumbs from 'commons/components/organisms/breadcrumbs/ProgramTeamSetting';
import ProgramPageTemplate from 'commons/components/template/program/ProgramPageTemplate';
import { useCreateAndJoinTeamMutation, useDeleteTeamMutation, useGetTeamQuery } from '../redux/features/team/TeamSlice';
import { useDeleteInvitationMutation, useGetMyInvitationsQuery, useGetTeamInvitationsQuery, useInviteMemberMutation } from '../redux/features/team/InvitationSlice';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

const invitationStatusTranslation = {
  Rejected: 'رد',
  Waiting: 'منتظر',
  Accepted: 'قبول',
}

type TeamSettingPropsType = {}

const TeamSetting: FC<TeamSettingPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const [isCreateInvitationDialogOpen, changeCreateInvitationDialogStatus] = useState(false);
  const [isDeleteTeamDialogOpen, changeDeleteTeamDialogStatus] = useState(false);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: team } = useGetTeamQuery({ teamId: registrationReceipt?.team as string }, { skip: !Boolean(registrationReceipt?.team) });
  const [newTeamName, setNewTeamName] = useState('');
  const isHead = registrationReceipt?.id == team?.team_head.toString()
  const [createAndJoinTeam] = useCreateAndJoinTeamMutation();
  const [deleteTeam, { isSuccess: isDeleteTeamSuccess }] = useDeleteTeamMutation();
  const [deleteInvitation] = useDeleteInvitationMutation();
  const { data: myInvitations } = useGetMyInvitationsQuery({ registrationFormId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: teamInvitations } = useGetTeamInvitationsQuery({ teamId: team?.id }, { skip: !Boolean(team?.id) });
  const sortedTeamInvitations = teamInvitations?.slice().sort((team1, team2) => team2.id - team1.id);

  const submitCreateTeam = () => {
    if (!newTeamName) {
      toast.error('لطفاً نام تیم را وارد کنید.');
      return;
    }
    createAndJoinTeam({
      name: newTeamName,
      programSlug,
    });
  };

  useEffect(() => {
    if (isDeleteTeamSuccess) {
      window.location.reload();
    }
  }, [isDeleteTeamSuccess])

  const submitDeleteTeam = (teamId) => {
    deleteTeam({ teamId });
  }

  return (
    <ProgramPageTemplate>
      <Layout appbarMode='GENERAL'>
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}>
          <Grid item xs={12} marginTop={-2}>
            <ProgramTeamSettingBreadcrumbs />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom align="center" variant='h1'>
              {'تیم‌بندی'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justifyContent="center"
              alignItems="flex-end">
              <Paper sx={{ position: 'relative', padding: 1, width: '100%' }}>
                <Stack spacing={2}>
                  {registrationReceipt && !registrationReceipt?.team && !team && (
                    <Fragment>
                      <Typography variant="caption">
                        {
                          'شما در تیمی عضو نیستید. یا خودتان یک تیم بسازید  و دیگران را به آن دعوت کنید، یا یکی از دعوت‌نامه‌هایی را که برایتان ارسال شده، قبول کنید.'
                        }
                      </Typography>
                      <Stack spacing={1}>
                        <Typography align="center" variant="h2">
                          {'ایجاد تیم جدید'}
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          value={newTeamName}
                          label="نام تیم"
                          onChange={(e) => setNewTeamName(e.target.value)}
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={submitCreateTeam}>
                          {'ایجاد'}
                        </Button>
                      </Stack>
                    </Fragment>
                  )}
                  {team &&
                    <Fragment>
                      <Typography align="center" variant="h2" gutterBottom>
                        {`تیم «${team.name}»`}
                      </Typography>
                      {isHead && (
                        <Box sx={{ position: 'absolute', right: 0, top: 0, marginTop: '0px !important' }}>
                          <Tooltip title="حذف تیم" arrow>
                            <IconButton
                              size="small"
                              onClick={() => changeDeleteTeamDialogStatus(true)}>
                              <ClearIcon
                                style={{ fontSize: '20px', color: 'red' }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      {team?.members?.map((member, index) => {
                        return (
                          <Stack
                            justifyContent="center"
                            alignItems="center"
                            key={index}>
                            <img
                              alt=""
                              style={{ borderRadius: '5px', objectFit: 'cover' }}
                              src={member.profile_picture || PROFILE_PICTURE}
                              width="200px"
                              height="200px"
                            />
                            <Typography align="center">
                              {`${member.user.first_name} ${member.user.last_name}`}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Fragment>
                  }
                  {!registrationReceipt && !team &&
                    <Stack alignItems='center' justifyContent='center' spacing={2}>
                      <Skeleton width='80%' height={60} animation="wave" />
                      <Stack >
                        <Skeleton variant='rectangular' width={150} height={150} />
                        <Skeleton animation="wave" width='100%' />
                      </Stack>
                    </Stack>
                  }
                </Stack>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper>
              <Stack sx={{ position: 'relative', paddingTop: 1 }}>
                <Typography align="center" variant="h2" gutterBottom>
                  {'دعوت‌نامه‌های ارسالی'}
                </Typography>
                {isHead && team?.id && (
                  <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <Tooltip title={'دعوت عضو جدید به تیم'} arrow>
                      <IconButton
                        size="small"
                        onClick={() => changeCreateInvitationDialogStatus(true)}>
                        <AddCircleOutlineIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Divider variant="middle" />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">فرد دعوت‌شده</TableCell>
                        <TableCell align="center">وضعیت</TableCell>
                        <TableCell align="center">عملیات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isHead && sortedTeamInvitations?.map((invitation, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {`${invitation.first_name || "بی‌نام"} ${invitation.last_name || "بی‌نام‌زاده"}`}
                          </TableCell>
                          <TableCell align="center">
                            {invitationStatusTranslation[invitation.status]}
                          </TableCell>
                          <TableCell align="center">
                            {invitation.status === 'Waiting' &&
                              <Tooltip title="پس‌گرفتن دعوت‌نامه" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    deleteInvitation({
                                      invitationId: invitation?.id,
                                    });
                                  }}>
                                  <ClearIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </Paper>

            <Paper sx={{ marginTop: 4 }}>
              <Stack sx={{ paddingTop: 1 }}>
                <Typography align="center" variant="h2" gutterBottom>
                  {'دعوت‌نامه‌های دریافتی'}
                </Typography>
                <Divider variant="middle" />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">تیم</TableCell>
                        <TableCell align="center">نام سرتیم</TableCell>
                        <TableCell align="center">شماره تلفن سرتیم</TableCell>
                        <TableCell align="center">پاسخ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myInvitations?.map((invitation, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {invitation.team_name}
                          </TableCell>
                          <TableCell align="center">
                            {`${invitation?.head_first_name} ${invitation?.head_last_name}`}
                          </TableCell>
                          <TableCell align="center">
                            {invitation?.head_phone_number}
                          </TableCell>
                          <TableCell align="center">
                            <RespondInvitation invitationId={invitation?.id} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <MakeInvitation
          open={isCreateInvitationDialogOpen}
          handleClose={() => changeCreateInvitationDialogStatus(false)}
          teamId={team?.id}
        />
        <AreYouSure
          open={isDeleteTeamDialogOpen}
          handleClose={() =>
            changeDeleteTeamDialogStatus(!isDeleteTeamDialogOpen)
          }
          callBackFunction={() => submitDeleteTeam(team.id)}
        />
      </Layout>
    </ProgramPageTemplate>
  );
};

export default TeamSetting;
