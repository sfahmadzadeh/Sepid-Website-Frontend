import React, { useEffect } from 'react';

import DashboardButton from '../components/DashboardButton';
import Brand from '../components/Brand';
import UserInfo from '../components/UserInfo';

const DashboardAppbarItems = ({}) => {

  const eventsButton = <DashboardButton label={'دوره‌ها'} to={'/programs/'} />;
  const articlesButton = <DashboardButton label={'مقاله‌ها'} to={'/articles/'} />;
  const aboutUsButton = <DashboardButton label={'درباره ما'} onClick={() => window.location.href = 'https://platform.kamva.academy/article/2075/'} />;
  const contactUsButton = <DashboardButton label={'تماس با ما'} onClick={() => window.location.href = 'https://platform.kamva.academy/article/2044/'} />;
  const brand = <Brand />
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [userInfo],
    desktopRightItems: [brand, eventsButton, articlesButton, aboutUsButton, contactUsButton],
    mobileLeftItems: [userInfo],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton, articlesButton, aboutUsButton, contactUsButton],
  };
};

export default DashboardAppbarItems;