import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';

import { logoutAction } from 'redux/slices/account';

function LogoutButton({ logout }) {

  return (
    <Button
      variant="outlined"
      onClick={logout}
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

export default connect(null, { logout: logoutAction })(LogoutButton);
