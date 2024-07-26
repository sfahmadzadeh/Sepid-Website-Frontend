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
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import MakeInvitation from 'components/organisms/dialogs/MakeInvitation';
import {
  createTeamAndJoinAction,
  deleteInvitationAction,
  deleteTeamAction,
  getMyInvitationsAction,
  getTeamAction,
  getTeamInvitationsAction,
  inviteSomeoneAction,
} from 'redux/slices/programs';
import Layout from 'components/template/Layout';
import RespondInvitation from 'components/molecules/RespondInvitation';
import { toast } from 'react-toastify';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery, useGetReceiptQuery } from 'redux/features/form/ReceiptSlice';
import { TeamType } from 'types/models';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

const invitationStatusTranslation = {
  Rejected: 'رد',
  Waiting: 'منتظر',
  Accepted: 'قبول',
}

type TeamSelectionPropsType = {
  getMyInvitations: any;
  deleteTeam: any;
  deleteInvitation: any;
  getTeam: any;
  getTeamInvitations: any;
  inviteSomeone: any;
  createTeamAndJoin: any;

  team: TeamType;
  myInvitations: any[],
  teamInvitations: any[],
}

const TeamSelection: FC<TeamSelectionPropsType> = ({
  getMyInvitations,
  deleteTeam,
  deleteInvitation,
  getTeam,
  getTeamInvitations,
  inviteSomeone,
  createTeamAndJoin,

  team,
  myInvitations,
  teamInvitations,
}) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [isCreateInvitationDialogOpen, changeCreateInvitationDialogStatus] = useState(false);
  const [isDeleteTeamDialogOpen, changeDeleteTeamDialogStatus] = useState(false);
  const { data: program } = useGetProgramQuery({ programId });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const [newTeamName, setNewTeamName] = useState('');

  useEffect(() => {
    if (program?.registration_form) {
      getMyInvitations({ registrationFormId: program.registration_form });
    }
  }, [program]);

  useEffect(() => {
    if (registrationReceipt?.team) {
      const teamId = registrationReceipt.team;
      getTeam({ teamId });
      getTeamInvitations({ teamId });
    }
  }, [registrationReceipt]);

  if (!registrationReceipt?.is_participating) {
    navigate(`/program/${programId}/form/`);
  }

  const isHead = registrationReceipt?.id === team?.team_head.toString()

  const submitCreateTeam = () => {
    if (!newTeamName) {
      toast.error('لطفاً نام گروه را وارد کنید.');
      return;
    }
    createTeamAndJoin({
      name: newTeamName,
      registration_form: program?.registration_form,
    });
  };

  const submitDeleteTeam = (teamId) => {
    deleteTeam({ teamId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        window.location.reload();
      }
    })
  }

  teamInvitations = teamInvitations.slice().sort((team1, team2) => team2.id - team1.id);

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom align="center" variant='h1'>
            {'گروه‌بندی'}
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
                        'شما در گروهی عضو نیستید. یا خودتان یک گروه بسازید  و دیگران را به آن دعوت کنید، یا یکی از دعوت‌نامه‌هایی را که برایتان ارسال شده، قبول کنید.'
                      }
                    </Typography>
                    <Stack spacing={1}>
                      <Typography align="center" variant="h2">
                        {'ایجاد گروه جدید'}
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={newTeamName}
                        label="نام گروه"
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
                      {`گروه «${team.name}»`}
                    </Typography>
                    {isHead && (
                      <Box sx={{ position: 'absolute', right: 0, top: 0, marginTop: '0px !important' }}>
                        <Tooltip title="حذف گروه" arrow>
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
                            {/* {`${member.first_name} ${member.last_name}`} */}
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
              {isHead && (
                <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Tooltip title={'دعوت عضو جدید به گروه'} arrow>
                    <IconButton
                      size="small"
                      onClick={
                        team?.id
                          ? () => {
                            changeCreateInvitationDialogStatus(true);
                          }
                          : () => { }
                      }>
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
                    {isHead && teamInvitations?.map((invitation, index) => (
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
                      <TableCell align="center">گروه</TableCell>
                      <TableCell align="center">نام سرگروه</TableCell>
                      <TableCell align="center">شماره تلفن سرگروه</TableCell>
                      <TableCell align="center">پاسخ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myInvitations.map((invitation, index) => (
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
        inviteSomeone={inviteSomeone}
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
  );
};

const mapStateToProps = (state) => ({
  registrationReceipt: state.programs.registrationReceipt,
  team: state.programs.team,
  //todo: handle not showing self invitation, in back:
  myInvitations: state.programs.myInvitations.filter(
    (invitation) => invitation.head_phone_number !== invitation.phone_number
  ),
  teamInvitations: state.programs.teamInvitations,
  isFetching: state.programs.isFetching,
});

export default connect(mapStateToProps, {
  getMyInvitations: getMyInvitationsAction,
  deleteTeam: deleteTeamAction,
  deleteInvitation: deleteInvitationAction,
  createTeamAndJoin: createTeamAndJoinAction,
  inviteSomeone: inviteSomeoneAction,
  getTeamInvitations: getTeamInvitationsAction,
  getTeam: getTeamAction,
})(TeamSelection);
