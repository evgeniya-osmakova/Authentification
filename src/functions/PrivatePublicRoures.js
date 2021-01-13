import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children, ...rest }) => {
  PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const { isAuthenticated } = useSelector((state) => state.userData);

  return (
    <Route
      {...rest}
      render = { () => (isAuthenticated
        ? (children)
        : <Redirect push to="/login" />)
      }
    />
  );
};

export const NonAuthRoute = ({ children, ...rest }) => {
  NonAuthRoute.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const { isAuthenticated } = useSelector((state) => state.userData);

  return (
    <Route
      {...rest}
      render = { () => (!isAuthenticated
        ? (children)
        : <Redirect push to="/" />
      )
      }
    />
  );
};
