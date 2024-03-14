import React from 'react';
import { FC } from 'react';
import Menu from '@mui/material/Menu';
import AppbarMenuItem from './AppbarMenuItem';
import { AppbarMenuItemType } from 'types/global';

type AppbarMenuPropsType = {
  anchorEl: any;
  items: AppbarMenuItemType[];
  handleClose: any;
}

const AppbarMenu: FC<AppbarMenuPropsType> = ({
  anchorEl,
  items,
  handleClose,
}) => {

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={handleClose}>
      {items.map((item, index) =>
        <AppbarMenuItem key={index} item={item} />
      )}
    </Menu>
  );
}

export default AppbarMenu;