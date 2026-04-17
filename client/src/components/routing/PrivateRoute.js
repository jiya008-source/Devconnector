import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  // Wait until auth is loaded
  if (loading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);