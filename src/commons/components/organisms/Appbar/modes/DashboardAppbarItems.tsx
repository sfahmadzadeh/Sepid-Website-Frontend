import React from 'react';

import DashboardButton from '../components/DashboardButton';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import DefaultAppbarItems from './DefaultAppbarItems';
import UserInfo from '../components/UserInfo';
import NotificationButton from '../components/NotificationButton';
import { useSelector } from 'react-redux';

const DashboardAppbarItems = ({ }) => {

  const { data: website } = useGetWebsiteQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ websiteName: website?.name, pageAddress: window.location.pathname }, { skip: !Boolean(website) });
  const isUserAuthenticated = useSelector((state: any) => state.account.accessToken);

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
  const notificationButton = <NotificationButton />

  return {
    desktopLeftItems: [
      ...desktopLeftItems,
      userInfo,
      isUserAuthenticated ? notificationButton : null,
    ],
    desktopRightItems: [
      websiteLogo,
      ...desktopRightItems,
    ],
    mobileLeftItems: [
      userInfo,
      isUserAuthenticated ? notificationButton : null,
    ],
    mobileRightItems: [],
    mobileMenuListItems: [
      ...desktopLeftItems,
      ...desktopRightItems,
    ],
  };
};

export default DashboardAppbarItems;
