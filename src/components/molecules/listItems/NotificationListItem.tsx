import React, { FC } from "react";
import {
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { MessageType } from "types/models";
import dateFormatter from 'utils/dateFormatter';

type NotificationListItemPropsType = {
  notification: MessageType;
}

const NotificationListItem: FC<NotificationListItemPropsType> = ({
  notification,
}) => {

  const seeNotification = () => {
    // todo
  }

  return (
    <MenuItem
      sx={{
        padding: 1,
        borderBottom: notification ? '1px solid #ccc' : '1px solid #faa',
        borderLeft: notification.seen ? '6px solid #8c8c8c' : '6px solid #00a1c9',
        background: notification.seen ? '#e8e8e8' : '#fff',
      }}
      onClick={seeNotification}
      disableRipple={notification.seen}>
      <Stack direction={'row'} spacing={2} whiteSpace={'pre-wrap'}>
        <Stack width={80} alignItems={'center'} justifyContent={'center'} spacing={1}>
          <img width={40} style={{ borderRadius: 5 }} src={notification.sender.logo.mobile_image} />
          <Typography textAlign={'center'} display={'inline'} component="small" variant="body2">
            {notification.sender.displayName}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack>
            <Typography paddingTop={1} variant='h5' gutterBottom>
              {notification.title}
            </Typography>
            <Typography display={'inline'}>
              {notification.content}
            </Typography>
          </Stack>
          <Typography component="small" variant="body2">
            {dateFormatter({
              date: notification.received_datetime,
              format: 'hh:mm:ss',
            })}
          </Typography>
        </Stack>
      </Stack>
    </MenuItem>
  )
}

export default NotificationListItem;