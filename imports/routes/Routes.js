import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import DefaultLayout from './DefaultLayout';
import HomePage from '../ui/pages/HomePage';
import AboutPage from '../ui/pages/AboutPage';
import AddFoodItemPage from '../ui/pages/AddFoodItemPage';
import EditFoodItemPage from '../ui/pages/EditFoodItemPage';
import NotFound from '../ui/pages/NotFound';

const history = createBrowserHistory();

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout path="/about" component={AboutPage} />
          <PrivateRoute path="/admin/food-item/add" component={AddFoodItemPage} />
          <PrivateRoute path="/admin/food-item/:_id/edit" component={EditFoodItemPage} />
          <DefaultLayout component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
