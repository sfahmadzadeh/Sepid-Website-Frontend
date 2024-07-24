import { Stack } from '@mui/material';
import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import NotificationButton from './NotificationButton';
import Avatar from './UserAvatar';
import DashboardButton from './DashboardButton';

const UserInfo = ({ }) => {
  const isUserAuthenticated = useSelector((state: any) => state.account.accessToken);

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
      {isUserAuthenticated ?
        <Avatar /> :
        <Stack direction={'row'} spacing={1}>
          <DashboardButton variant='outlined' label='ورود' to={'/login/'} onClick={null} />
          <DashboardButton variant='contained' label='عضویت' to={'/create-account/'} onClick={null} />
        </Stack>
      }
    </Stack>
  )
}

export default UserInfo;
