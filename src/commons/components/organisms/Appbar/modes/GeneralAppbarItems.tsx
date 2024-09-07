import React from 'react';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';

const GeneralAppbarItems = ({}) => {
  const websiteLogo = <WebsiteLogo />;

  const desktopLeftItems = [];
  const desktopRightItems = [websiteLogo];
  const mobileLeftItems = [];
  const mobileRightItems = [websiteLogo];
  const mobileMenuListItems = [];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default GeneralAppbarItems;
