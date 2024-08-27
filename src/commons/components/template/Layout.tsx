import React, { FC, Fragment } from 'react';
import { Container } from '@mui/material';

import AppBar from 'commons/components/organisms/Appbar';
import { AppbarModes } from 'commons/types/global';

type LayoutPropsType = {
  appbarMode: AppbarModes;
  children: any;
}

const Layout: FC<LayoutPropsType> = ({
  appbarMode = 'DASHBOARD',
  children,
}) => {

  return (
    <Fragment>
      <AppBar mode={appbarMode} position="relative" />
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: 4,
          marginBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {children}
      </Container>
    </Fragment>
  );
};


export default Layout;
