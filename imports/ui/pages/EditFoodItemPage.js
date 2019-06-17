import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import FoodItemFormContainer from '../components/FoodItemForm/FoodItemFormContainer';

export default class EditFoodItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    Meteor.call('FoodItems.get', this.props.match.params._id, (err, item) => {
      this.setState({ item });
    });
  }

  onSubmit(values, props) {
    Meteor.call('FoodItems.update', values, (err) => {
      if (err) {
        console.log(err);
        return alert(err.message);
      }

      this.props.history.push("/");
    });
  }

  render() {
    let hasItem = Object.keys(this.state.item).length !== 0;
    return (
      <div>
        <header><h1><Link to="/" title="&laquo; Back">&laquo;</Link> Edit food item</h1></header>
        { hasItem ? (
          <FoodItemFormContainer onSubmit={this.onSubmit} data={this.state.item} {...this.props} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
