import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import FoodItemForm from '../components/FoodItemForm/FoodItemForm';

export default class AddFoodItemPage extends Component {
  constructor(props) {
    super(props);

    // Without this 'this' will be undefined in handleSubmit method
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('values: ', values);
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
        <FoodItemForm onSubmit={this.handleSubmit} {...this.props} />
      </div>
    );
  }
}
