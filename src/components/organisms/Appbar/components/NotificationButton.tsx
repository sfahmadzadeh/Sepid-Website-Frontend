import { Badge, Grid, IconButton, MenuItem, MenuList, Paper, Popover, Typography } from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import dateFormatter from 'utils/dateFormatter';
import { MessageType } from 'types/models';

type NotificationButtonPropsType = {
  notifications: MessageType[];
}

const NotificationButton: FC<NotificationButtonPropsType> = ({
  notifications = [],
}) => {
  const t = useTranslate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton onClick={handlePopoverOpen} size='small' disableRipple>
        <Badge badgeContent={notifications.length}
          sx={() => ({
            '& .MuiBadge-badge': {
              background: 'red',
              color: 'white',
            },
          })}>
          <NotificationsIcon fontSize='large' />
        </Badge>
      </IconButton>
      <Popover
        disableScrollLock
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        marginThreshold={30}>
        <MenuList component={Paper}
          sx={{
            minWidth: 200,
            maxHeight: 400,
            overflowY: 'auto',
          }}>
          {notifications
            .sort((a, b) => b.received_datetime - a.received_datetime)
            .map((notification) => (
              <MenuItem
                key={notification.id}
                sx={{
                  padding: 1,
                  borderBottom: notification ? '1px solid #ccc' : '1px solid #faa',
                  borderLeft: notification.seen ? '1px solid #ccc' : '6px solid red',
                  background: notification.seen ? '#fff' : '#f9f4f4',
                }}>
                <Grid container justifyContent="flex-start" spacing={1}>
                  <Grid item>
                    <div style={{ textAlign: 'center' }}>
                      <div>
                        <AccountCircleIcon />
                      </div>
                      <Typography component="small" variant="body2">
                        {t('support')}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography component="small" variant="body2">
                      {dateFormatter({
                        date: notification.received_datetime,
                        format: 'hh:mm:ss',
                      })}
                    </Typography>
                    <Typography component="p" variant="subtitle2">
                      {notification.content}
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          {notifications.length === 0 &&
            <Typography textAlign={'center'} padding={2} fontSize={16} fontWeight={400}>
              {'اعلان خوانده‌نشده‌ای نداری 🤝'}
            </Typography>
          }
        </MenuList>
      </Popover >
    </Fragment>
  );
};

export default NotificationButton;
