import React from 'react';
import UserInfo from '../components/UserInfo';
import Brand from '../components/Brand';

const WebsiteAppbarItems = () => {
  const brand = <Brand />;

  const desktopLeftItems = [];
  const desktopRightItems = [brand];
  const mobileRightItems = [brand];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default WebsiteAppbarItems;