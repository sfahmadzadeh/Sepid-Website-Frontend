import React from 'react';
import UserInfo from '../components/UserInfo';
import WebsiteLogo from '../components/logos/WebsiteLogo';
import DashboardButton from '../components/DashboardButton';

const ProgramAppbarItems = ({ }) => {
  const websiteLogo = <WebsiteLogo />
  const userInfo = <UserInfo />
  const backButton = <DashboardButton label={'بازگشت به دوره‌ها'} to={'/programs/'} />

  const desktopLeftItems = [];
  const desktopRightItems = [websiteLogo];
  const mobileRightItems = [websiteLogo];
  desktopLeftItems.push(userInfo, backButton);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [userInfo, backButton],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default ProgramAppbarItems;