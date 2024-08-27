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
import { connect } from 'react-redux';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure'
import { removeFromTeamAction } from 'apps/website-display/redux/slices/programs';

import {
  makeTeamHeadAction,
} from 'apps/website-display/redux/slices/programs';

type TeamMemberListItemPropsType = {
  memberId: string;
  firstName: string;
  lastName: string;
  teamId: string;
  teamHead: number;
  username: string;

  makeTeamHead: any;
  removeFromTeam: any;
}

const TeamMemberListItem: FC<TeamMemberListItemPropsType> = ({
  memberId,
  firstName,
  lastName,
  teamId,
  teamHead,
  username,

  makeTeamHead,
  removeFromTeam,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [removeTeamMemberDialog, setRemoveTeamMemberDialog] = useState(false)

  const submitRemoveFromTeam = () => {
    removeFromTeam({ receipt: memberId })
  }

  return (
    <Fragment>
      <Stack direction='row' key={memberId} alignItems='start' justifyContent='space-between'>
        <FormControlLabel
          control={
            <Checkbox
              checked={teamHead.toString() == memberId}
              onClick={() => {
                makeTeamHead({ receipt: memberId, teamId })
              }}
              color="primary" />
          }
          label={`${firstName} ${lastName}` === ' ' ? 'بی‌نام!' : `${firstName} ${lastName} (${username})`}
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
          }}>{'حذف از گروه'}</MenuItem>
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


export default connect(null, {
  removeFromTeam: removeFromTeamAction,
  makeTeamHead: makeTeamHeadAction,
})(TeamMemberListItem);
