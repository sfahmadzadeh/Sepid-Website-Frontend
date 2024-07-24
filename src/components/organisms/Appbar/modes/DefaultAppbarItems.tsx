import React from 'react';
import WebsiteLogo from 'components/atoms/logos/WebsiteLogo';

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