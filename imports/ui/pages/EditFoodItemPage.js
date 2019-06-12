import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import FoodItemForm from '../components/FoodItemForm/FoodItemForm';

export default class EditFoodItemPage extends Component {
  constructor(props) {
    super(props);
    console.log('constructor props: ', props);

    this.state = {
      item: {}
    }

    // Without this 'this' will be undefined in handleSubmit method
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Simulate loading
    setTimeout(() => {
      Meteor.call('FoodItems.get', this.props.match.params._id, (err, item) => {
        this.setState({ item });
      });
    }, 1000);
  }

  handleSubmit(values, props) {
    console.log('values: ', values);
    console.log('this.props: ', this.props, props);
    Meteor.call('FoodItems.update', values, (err) => {
      if (err) {
        console.log(err);
        return alert(err.message);
      }

      console.log('this.props inside Meteor.call', this.props);
      this.props.history.push("/");
    });
  }

  render() {
    let hasItem = Object.keys(this.state.item).length !== 0;
    return (
      <div>
        <header><h1>Edit food item</h1></header>
        { hasItem ? (
          <FoodItemForm onSubmit={this.handleSubmit} data={this.state.item} {...this.props} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
