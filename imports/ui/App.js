import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

import DefaultLayout from './components/DefaultLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AddFoodItemPage from './pages/AddFoodItemPage';
import EditFoodItemPage from './pages/EditFoodItemPage';
import NotFound from './pages/NotFound';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout path="/about" component={AboutPage} />
          <DefaultLayout path="/admin/food-item/add" component={AddFoodItemPage} />
          <DefaultLayout path="/admin/food-item/:_id/edit" component={EditFoodItemPage} />
          <DefaultLayout component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
