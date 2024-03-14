import React from 'react';
import Brand from '../components/Brand';

const DefaultAppbarItems = ({ }) => {

  const brand = <Brand />

  return {
    desktopLeftItems: [],
    desktopRightItems: [brand],
    mobileLeftItems: [],
    mobileRightItems: [],
    mobileMenuListItems: [],
  };
};

export default DefaultAppbarItems;