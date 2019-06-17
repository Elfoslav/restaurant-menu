import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import DefaultLayout from './DefaultLayout';

function PrivateRoute({ component: Component, ...rest }) {
  const [isLoggedIn, setIsLoggedIn] = useState(Meteor.userId());
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <DefaultLayout component={arguments[0].component} {...props} />
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
