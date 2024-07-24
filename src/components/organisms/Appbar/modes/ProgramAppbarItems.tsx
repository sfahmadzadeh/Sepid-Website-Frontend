import React from 'react';
import WebsiteLogo from '../components/logos/WebsiteLogo';
import DashboardButton from '../components/DashboardButton';
import NotificationButton from '../components/NotificationButton';

const ProgramAppbarItems = ({ }) => {
  const websiteLogo = <WebsiteLogo />
  const notificationButton = <NotificationButton />
  const backButton = <DashboardButton label={'بازگشت به دوره‌ها'} to={'/programs/'} />

  const desktopLeftItems = [];
  const desktopRightItems = [websiteLogo];
  const mobileRightItems = [websiteLogo];
  desktopLeftItems.push(notificationButton, backButton);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [notificationButton, backButton],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default ProgramAppbarItems;