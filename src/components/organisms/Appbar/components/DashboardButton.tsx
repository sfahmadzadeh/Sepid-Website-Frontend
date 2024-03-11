import { Button, Icon, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type DashboardButtonPropsType = {
  name: string;
  variant?: "text" | "outlined" | "contained";
  to?: any;
  onClick?: any;
}

const DashboardButton: FC<DashboardButtonPropsType> = ({
  name,
  variant = 'text',
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      onClick={() => {
        navigate(to);
        onClick?.();
      }}>
      <Typography fontSize={14} fontWeight={400}>{name}</Typography>
    </Button>
  );
}

export default DashboardButton;