import React from 'react';
import DashboardButton from '../components/DashboardButton';
import WebsiteLogo from '../components/WebsiteLogo';

const GeneralAppbarItems = ({}) => {
  const backToLanding = <DashboardButton label={'بازگشت'} to={-1} />;
  const websiteLogo = <WebsiteLogo />;

  const desktopLeftItems = [backToLanding];
  const desktopRightItems = [websiteLogo];
  const mobileLeftItems = [backToLanding];
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
