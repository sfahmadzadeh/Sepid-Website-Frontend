import React from 'react';

import DashboardButton from '../components/DashboardButton';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import WebsiteLogo from '../components/WebsiteLogo';
import DefaultAppbarItems from './DefaultAppbarItems';
import UserInfo from '../components/UserInfo';

const DashboardAppbarItems = ({ }) => {

  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });

  if (!pageMetadata?.appbar?.body) {
    return DefaultAppbarItems({})
  }

  const desktopLeftItems = [];
  pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'left').forEach((item, index) => {
    desktopLeftItems.push(
      <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
    );
  })
  const desktopRightItems = [];
  pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'right').forEach((item, index) => {
    desktopRightItems.push(
      <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
    );
  })
  const websiteLogo = <WebsiteLogo />;
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [...desktopLeftItems, userInfo],
    desktopRightItems: [websiteLogo, ...desktopRightItems],
    mobileLeftItems: [userInfo],
    mobileRightItems: [],
    mobileMenuListItems: [...desktopLeftItems, ...desktopRightItems],
  };
};

export default DashboardAppbarItems;
