import {
  Checkbox,
  FormControlLabel,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { FC, Fragment, useState } from 'react';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure'
import { UserInfoType } from 'commons/types/profile';
import {
  useMakeUserTeamHeadMutation,
  useRemoveUserFromTeamMutation,
} from 'apps/website-display/redux/features/team/MemberSlice';

type TeamMemberListItemPropsType = {
  memberId: string;
  user: UserInfoType;
  teamId: string;
  teamHead: string;
  username: string;
}

const TeamMemberListItem: FC<TeamMemberListItemPropsType> = ({
  memberId,
  user,
  teamId,
  teamHead,
  username,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [removeUserFromTeam] = useRemoveUserFromTeamMutation();
  const [makeUserTeamHead] = useMakeUserTeamHeadMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [removeTeamMemberDialog, setRemoveTeamMemberDialog] = useState(false)

  const submitRemoveFromTeam = () => {
    removeUserFromTeam({ receiptId: memberId, teamId })
  }

  return (
    <Fragment>
      <Stack direction='row' key={memberId} alignItems='start' justifyContent='space-between'>
        <FormControlLabel
          control={
            <Checkbox
              checked={teamHead == memberId}
              onClick={() => {
                makeUserTeamHead({ receiptId: memberId, teamId })
              }}
              color="primary" />
          }
          label={(!user?.first_name || !user?.last_name) ? 'بی‌نام!' : `${user.first_name} ${user.last_name} (${username})`}
          labelPlacement="end"
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu disableScrollLock
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}>
          <MenuItem onClick={() => {
            setRemoveTeamMemberDialog(true);
            handleClose();
          }}>
            {'حذف از تیم'}
          </MenuItem>
        </Menu>
      </Stack>

      <AreYouSure
        open={removeTeamMemberDialog}
        handleClose={() => setRemoveTeamMemberDialog(false)}
        callBackFunction={submitRemoveFromTeam}
      />
    </Fragment>
  );
};

export default TeamMemberListItem;