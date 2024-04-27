import React from 'react';
import ProgramLogoButton from '../components/ProgramLogoButton';
import UserInfo from '../components/UserInfo';
import Brand from '../components/Brand';
import DashboardButton from '../components/DashboardButton';

const ProgramAppbarItems = ({ program }) => {
  const brand = <Brand />
  const programLogoButton = <ProgramLogoButton />;
  const userInfo = <UserInfo />
  const backButton1 = <DashboardButton label={'بازگشت به دوره‌ها'} to={'/programs/'} />
  const backButton2 = <DashboardButton label={'بازگشت'} to={'/programs/'} />

  const desktopLeftItems = [];
  const desktopRightItems = [brand];
  const mobileRightItems = [brand];
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