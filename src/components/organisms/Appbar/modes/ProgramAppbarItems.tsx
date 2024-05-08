import React from 'react';
import UserInfo from '../components/UserInfo';
import WebsiteLogo from '../components/logos/WebsiteLogo';
import DashboardButton from '../components/DashboardButton';

const ProgramAppbarItems = ({ program }) => {
  const websiteLogo = <WebsiteLogo />
  const userInfo = <UserInfo />
  const backButton1 = <DashboardButton label={'بازگشت به دوره‌ها'} to={'/programs/'} />
  const backButton2 = <DashboardButton label={'بازگشت'} to={'/programs/'} />

  const desktopLeftItems = [];
  const desktopRightItems = [websiteLogo];
  const mobileRightItems = [websiteLogo];
  desktopLeftItems.push(userInfo, backButton1);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [userInfo, backButton2],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default ProgramAppbarItems;