import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateRoute = ({ accessToken }) => {
  const { programId } = useParams();
  if (!accessToken) {
    return <Navigate to={'/'} />
  }
  return <Outlet />
};

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
});

export default connect(mapStateToProps)(PrivateRoute);
