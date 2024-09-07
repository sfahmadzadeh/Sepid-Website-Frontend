import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stringToColor } from 'commons/utils/stringToColor';
import { logoutAction } from 'apps/website-display/redux/slices/account';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGetPermissionQuery } from 'apps/website-display/redux/features/WebsiteSlice';

type UserAvatarPropsType = {
  name: string;
  logout: any;
}

const UserAvatar = ({ name = 'بی‌نام', logout }: UserAvatarPropsType) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: websitePermissions } = useGetPermissionQuery();

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <Avatar
          sx={{ backgroundColor: stringToColor(name) }}
          alt="logo">
          {name[0]}
        </Avatar>
      </IconButton>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <Typography sx={{ padding: 1, paddingX: 2, userSelect: 'none' }} fontWeight={500} fontSize={20}>
          {name || 'بی‌نام بی‌نام‌زاده'}
        </Typography>
        <MenuItem onClick={() => {
          navigate('/setting/');
        }}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <AccountCircleIcon />
            <Typography>
              {'تنظیمات فردی'}
            </Typography>
          </Stack>
        </MenuItem>
        {websitePermissions?.isAdmin &&
          <MenuItem onClick={() => navigate(`/website/manage/`)}>
            <Stack direction='row' spacing={1} alignItems={'center'}>
              <SettingsIcon />
              <Typography>
                {'تنظیمات آکادمی'}
              </Typography>
            </Stack>
          </MenuItem>
        }
        <MenuItem onClick={logout}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <LogoutIcon />
            <Typography>
              {'خروج از حساب کاربری'}
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  name: state.account.userInfo?.first_name && state.account.userInfo?.last_name
    ? `${state.account.userInfo.first_name} ${state.account.userInfo.last_name}`
    : ''
});

export default connect(mapStateToProps, {
  logout: logoutAction,
})(UserAvatar);
