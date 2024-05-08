import { Stack } from '@mui/material';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import NotificationButton from './NotificationButton';
import Avatar from './UserAvatar';
import DashboardButton from './DashboardButton';

type UserInfoPropsType = {
  isUserAuthenticated: boolean;
}

function UserInfo({ isUserAuthenticated }: UserInfoPropsType) {

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
      {isUserAuthenticated ?
        <Fragment>
          <NotificationButton />
          <Avatar />
        </Fragment> :
        <Stack direction={'row'} spacing={1}>
          <DashboardButton variant='outlined' label='ورود' to={'/login/'} onClick={null} />
          <DashboardButton variant='contained' label='عضویت' to={'/create-account/'} onClick={null} />
        </Stack>
      }
    </Stack>
  )
}

const mapStateToProps = (state) => ({
  isUserAuthenticated: Boolean(state.account.accessToken),
});

export default connect(mapStateToProps)(UserInfo);
