import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navigation from '../ui/components/Navigation/Navigation';

export default DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Navigation />
        <div className="container">
          <div className="content">
            <Component {...matchProps} />
          </div>
        </div>
        <footer>&copy; 2019 <a href="https://www.meteor.com/tutorials/react">Meteor.js + React tutorial</a></footer>
      </div>
    )} />
  )
};
