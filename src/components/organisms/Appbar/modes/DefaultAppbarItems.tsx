import React from 'react';
import WebsiteLogo from '../components/logos/WebsiteLogo';

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