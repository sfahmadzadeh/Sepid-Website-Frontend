import React, { FC, Fragment } from 'react';

import Layout from 'components/template/Layout';
import Profile from 'components/template/Profile';

type ProfilePropsType = {}

const ProfilePage: FC<ProfilePropsType> = ({ }) => {

  return (
    <Fragment>
      <Layout appbarMode='PROGRAM'>
        <Profile />
      </Layout>
    </Fragment>
  );
}

export default ProfilePage;