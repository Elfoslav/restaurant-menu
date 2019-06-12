import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div className="content">
        <h1>404</h1>
        <p>
          Oops! Not Found!
          &nbsp;
          <Link to="/">Go to homepage</Link>
        </p>
      </div>
    );
  }
}
