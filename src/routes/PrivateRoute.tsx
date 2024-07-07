import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ accessToken }) => {
  const location = useLocation();

  if (!accessToken) {
    return <Navigate state={{ from: location }} to={'/login/'} />
  }
  return <Outlet />
};

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
});

export default connect(mapStateToProps)(PrivateRoute);
