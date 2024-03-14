import React from 'react';

import DashboardButton from '../components/DashboardButton';
import { useGetPageMetadataQuery, useGetPartyQuery } from 'redux/features/PartySlice';
import Brand from '../components/Brand';
import DefaultAppbarItems from './DefaultAppbarItems';
import UserInfo from '../components/UserInfo';

const DashboardAppbarItems = ({ }) => {

  const { data: party } = useGetPartyQuery();
  const { data: pageMetadata } = useGetPageMetadataQuery({ partyUuid: party?.uuid, pageAddress: window.location.pathname }, { skip: !Boolean(party) });

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
  const brand = <Brand />;
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [...desktopLeftItems, userInfo],
    desktopRightItems: [brand, ...desktopRightItems],
    mobileLeftItems: [userInfo],
    mobileRightItems: [],
    mobileMenuListItems: [...desktopLeftItems, ...desktopRightItems],
  };
};

export default DashboardAppbarItems;
