import React, { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import AppbarMenu from './AppbarMenu';
import { AppbarMenuItemType } from 'types/global';

type AppbarMenuItemPropsType = {
  item: AppbarMenuItemType;
}

const AppbarMenuItem: FC<AppbarMenuItemPropsType> = ({
  item,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget)
    navigate(item.to);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <MenuItem onClick={onClick}>{item.label}</MenuItem>
      <AppbarMenu anchorEl={anchorEl} items={item.items} handleClose={handleClose} />
    </Fragment>
  );
}

export default AppbarMenuItem;