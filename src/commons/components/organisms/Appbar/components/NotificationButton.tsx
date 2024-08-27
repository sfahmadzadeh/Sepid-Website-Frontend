import {
  Badge,
  IconButton,
  Popover,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import React, { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import NotificationsList from 'commons/components/organisms/lists/NotificationsList';
import { MessageType } from 'commons/types/models';
import useWebSocket from 'commons/components/hooks/useWebsocket';
import { useGetUserProfileSummaryQuery, useGetWebsiteProfileSummaryQuery } from 'apps/website-display/redux/features/party/ProfileSlice';

type NotificationButtonPropsType = {
}

const NotificationButton: FC<NotificationButtonPropsType> = ({
}) => {
  const t = useTranslate();
  const { data: website } = useGetWebsiteProfileSummaryQuery({});
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfileSummary } = useGetUserProfileSummaryQuery({ userId: userInfo?.id }, { skip: !userInfo?.id });
  const room = (website?.name && userProfileSummary?.id) ? `sepid-${website.name}-${userProfileSummary?.id}` : null;
  // const sendMessage = useWebSocket({ room });
  const [message, setMessage] = useState('');
  const messages = useSelector((state: any) => state.websocket.messages);
  const status = useSelector((state: any) => state.websocket.status);

  const notifications: MessageType[] = [];
  // [
  //   {
  //     id: 1,
  //     sender: {
  //       displayName: 'حاج‌آقا ترکاشوند',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://platform.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     sent_datetime: '',
  //     received_datetime: '',
  //   },
  //   {
  //     id: 2,
  //     sender: {
  //       displayName: 'میناکاریان صندوقچه',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://minigames.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     seen: true,
  //     received_datetime: 'erfedgrf',
  //   },
  //   {
  //     id: 3,
  //     sender: {
  //       displayName: 'حاج‌آقا ترکاشوند',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://platform.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     seen: false,
  //     received_datetime: 'erfedgrf',
  //   },
  //   {
  //     id: 4,
  //     sender: {
  //       displayName: 'میناکاریان صندوقچه',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://minigames.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     seen: true,
  //     received_datetime: 'erfedgrf',
  //   },
  //   {
  //     id: 5,
  //     sender: {
  //       displayName: 'حاج‌آقا ترکاشوند',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://platform.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     seen: false,
  //     received_datetime: 'erfedgrf',
  //   },
  //   {
  //     id: 6,
  //     sender: {
  //       displayName: 'میناکاریان صندوقچه',
  //       logo: {
  //         desctop_image: '',
  //         mobile_image: 'https://minigames.kamva.academy/logo.png',
  //       }
  //     },
  //     recipient: null,
  //     title: 'احسنت! پاسخ شما درست بود',
  //     content: 'به خاطر پاسخ درست شما به پرسش فلان، صد سکه‌ی تمام بهار آزادی در خیال به شما اضافه شد',
  //     seen: true,
  //     received_datetime: 'erfedgrf',
  //   },
  // ];
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const unSeenNotifications = notifications.filter(notification => !notification.seen);

  return (
    <Fragment>
      <IconButton onClick={handlePopoverOpen} size='small' disableRipple>
        <Badge badgeContent={unSeenNotifications.length}
          sx={() => ({
            '& .MuiBadge-badge': {
              background: '#00a1c9',
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        marginThreshold={30}>
        <NotificationsList notifications={unSeenNotifications} />
      </Popover >
    </Fragment>
  );
};

export default NotificationButton;

