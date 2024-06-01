import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import validateURL from 'utils/validators/urlValidator'
import AreYouSure from 'components/organisms/dialogs/AreYouSure'

import {
  deleteTeamAction,
  updateTeamChatRoomLinkAction,
} from 'redux/slices/programs';
import TeamMember from 'components/atoms/TeamMember';
import { TeamType } from 'types/models';

type TeamInfoCardPropsType = {
  team: TeamType;
  deleteTeam: Function;
  updateTeamChatRoomLink: Function;
}

const TeamInfoCard: FC<TeamInfoCardPropsType> = ({
  team,
  deleteTeam,
  updateTeamChatRoomLink,
}) => {
  const [teamLink, setTeamLink] = useState(team?.chat_room)
  const [linkIsValid, setLinkIsValid] = useState(false)
  const [disableRequest, setDisableRequest] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState(false)

  useEffect(() => {
    setLinkIsValid(validateURL(teamLink))
  }, [teamLink])

  function updateTeamLink() {
    setDisableRequest(true)
    updateTeamChatRoomLink({ teamId: team.id, chat_room: teamLink }).then((response) => {
      setDisableRequest(false);
    })
  }

  if (!team) {
    return null;
  }

  return (
    <Fragment>
      <Card
        sx={{
          maxWidth: 300,
          margin: '0px auto',
          height: '100%',
          width: '100%',
          padding: '0px !important',
          backgroundColor: 'rgb(255, 255, 255, 0.94)',
          fontSize: '1rem',
          textDecoration: 'none',
          overflow: 'hidden',
          boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.1s ease-in-out',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          // '&:hover': {
          //   transform: 'translateY(-0.1rem) scale(1.01)',
          //   boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
          // },
        }}

      >
        <CardContent>
          <Typography gutterBottom variant="h3" align="center">
            {team.name}
          </Typography>
          <Stack spacing={2}>
            {team.members.length > 0 ? team.members.map((member) => (
              <Box key={member.id}>
                <TeamMember memberId={member.id}
                  firstName={member.user.first_name}
                  lastName={member.user.last_name}
                  teamId={team.id}
                  username={member.user.username}
                  teamHead={team.team_head} />
              </Box>
            ))
              :
              <Typography marginLeft='10px' marginTop='20px'>این گروه هیچ عضوی ندارد.</Typography>}
          </Stack>
        </CardContent>
        <CardActions sx={{ alignItems: 'center' }}>
          <Stack alignItems='center' width='100%' margin='0 auto' direction="column" spacing={1}>
            <Box margin='0 auto' width='100%'>
              <Box width='100%' height='10px'></Box>
              <Divider sx={{ width: '100%' }} />
              <Box width='100%' height='10px'></Box>
              <TextField
                error={!linkIsValid && !(teamLink == '' || teamLink == null)}
                helperText={(!linkIsValid && !(teamLink == '' || teamLink == null)) ? ".ورودی وارد شده لینک معتبری نیست" : ' '}
                id="standard-multiline-static"
                label="لینک گروه"
                multiline
                rows={3}
                placeholder="somelink.somedomain"
                variant="outlined"
                value={teamLink || ''}
                onChange={(e) => setTeamLink(e.target.value)}
                sx={{ marginBottom: '10px', marginTop: '10px', width: '100%', direction: 'rtl' }}
              />
              <ButtonGroup sx={{ height: '40px' }} variant="outlined" color="primary" fullWidth>
                <Button disabled={!linkIsValid || teamLink === '' || teamLink === team.chat_room || disableRequest} onClick={updateTeamLink}>{'به‌روز‌رسانی'}</Button>
                <Button onClick={() => setDeleteDialogId(true)}>{'حذف'}</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </CardActions>
      </Card >
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(false)}
        callBackFunction={() => deleteTeam({ teamId: team.id })}
      />
    </Fragment>
  );
};

export default connect(null, {
  deleteTeam: deleteTeamAction,
  updateTeamChatRoomLink: updateTeamChatRoomLinkAction
})(TeamInfoCard);
