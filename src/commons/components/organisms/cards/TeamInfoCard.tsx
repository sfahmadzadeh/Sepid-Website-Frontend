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
import validateURL from 'commons/utils/validators/urlValidator'
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure'
import { TeamType } from 'commons/types/models';
import TeamMemberListItem from 'commons/components/molecules/listItems/TeamMemberListItem';
import { useDeleteTeamMutation, useUpdateTeamMutation } from 'apps/website-display/redux/features/team/TeamSlice';

type TeamInfoCardPropsType = {
  team: TeamType;
}

const TeamInfoCard: FC<TeamInfoCardPropsType> = ({
  team,
}) => {
  const [teamLink, setTeamLink] = useState(team?.chat_room)
  const [linkIsValid, setLinkIsValid] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState(false)
  const [updateTeam, { isLoading: isUpdateTeamLoading }] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  useEffect(() => {
    setLinkIsValid(validateURL(teamLink))
  }, [teamLink])

  function updateTeamLink() {
    updateTeam({ teamId: team.id, chat_room: teamLink });
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
                <TeamMemberListItem
                  memberId={member.id}
                  user={member.user}
                  teamId={team.id}
                  username={member.user.username}
                  teamHead={team.team_head} />
              </Box>
            ))
              :
              <Typography marginLeft='10px' marginTop='20px'>این تیم هیچ عضوی ندارد.</Typography>}
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
                label="لینک اتاق گفتگوی تیم"
                multiline
                rows={3}
                placeholder="somelink.somedomain"
                variant="outlined"
                value={teamLink || ''}
                onChange={(e) => setTeamLink(e.target.value)}
                sx={{ marginBottom: '10px', marginTop: '10px', width: '100%', direction: 'rtl' }}
              />
              <ButtonGroup sx={{ height: '40px' }} variant="outlined" color="primary" fullWidth>
                <Button disabled={!linkIsValid || teamLink === '' || teamLink === team.chat_room || isUpdateTeamLoading} onClick={updateTeamLink}>{'به‌روز‌رسانی'}</Button>
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

export default TeamInfoCard;
