import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import DefaultLayout from './DefaultLayout';

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = Meteor.user();
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <DefaultLayout {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
