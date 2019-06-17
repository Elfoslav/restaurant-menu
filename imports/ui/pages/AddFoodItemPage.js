import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import FoodItemFormContainer from '../components/FoodItemForm/FoodItemFormContainer';

export default class AddFoodItemPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    Meteor.call('FoodItems.insert', values, (err) => {
      if (err) {
        return alert(err.message);
      }

      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div>
        <header><h1>Add new food item</h1></header>
        <FoodItemFormContainer onSubmit={this.onSubmit} {...this.props} />
      </div>
    );
  }
}
