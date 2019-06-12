import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AccountsUIWrapper from '../AccountsUIWrapper.js';
import './navigation.css';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="layout-header">
        <div className="nav">
          <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/about">About</NavLink>
          <AccountsUIWrapper />
        </div>
      </nav>
    )
  }
}
