import React from 'react';
import WebsiteLogo from '../components/WebsiteLogo';

const DefaultAppbarItems = ({ }) => {

  const websiteLogo = <WebsiteLogo />

  return {
    desktopLeftItems: [],
    desktopRightItems: [websiteLogo],
    mobileLeftItems: [],
    mobileRightItems: [],
    mobileMenuListItems: [],
  };
};

export default DefaultAppbarItems;