import { Button, Icon, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AppbarMenu from './AppbarMenu';
import { AppbarMenuItemType } from 'types/global';

type DashboardButtonPropsType = {
  label: string;
  variant?: "text" | "outlined" | "contained";
  to?: any;
  onClick?: any;
  items?: AppbarMenuItemType[];
}

const DashboardButton: FC<DashboardButtonPropsType> = ({
  label,
  variant = 'text',
  to,
  onClick,
  items,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const onClickWrapper = (event) => {
    if (to) {
      if (to.startsWith('http')) {
        window.location.href = to;
      } else {
        navigate(to);
      }
    }
    if (onClick) {
      onClick();
    }
    if (items?.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        variant={variant}
        onClick={onClickWrapper}>
        <Typography fontSize={14} fontWeight={400}>{label}</Typography>
      </Button>
      {items?.length > 0 &&
        <AppbarMenu anchorEl={anchorEl} handleClose={handleClose} items={items} />
      }
    </Fragment>
  );
}

export default DashboardButton;