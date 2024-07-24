import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from 'redux/slices/account';

function LogoutButton({ }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="outlined"
      onClick={() => dispatch(logoutAction)}
      endIcon={
        <Icon>
          <img
            src={`${process.env.PUBLIC_URL}/icons/logout.png`}
            alt=''
            style={{
              maxHeight: '20px',
              width: '100%',
            }}
          />
        </Icon>
      }>
      <Typography variant="caption">خروج</Typography>
    </Button>
  );
}

export default LogoutButton;