import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { FoodItems } from '../../api/FoodItems.js';
import FoodItem from '../components/FoodItem/FoodItem.js';

class HomePage extends Component {
  renderFoodItems() {
    let filteredFoodItems = this.props.foodItems;

    return filteredFoodItems.map((foodItem) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = foodItem.owner === currentUserId;

      return (
        <FoodItem
          key={foodItem._id}
          foodItem={foodItem}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>
            Restaurant menu
            { this.props.currentUser ? (
              <Link className="float-right btn btn-medium" to="/admin/food-item/add">Add food</Link>
            ) : ''}
          </h1>

          { this.props.currentUser ? (
            ''
          ) : (
            <p>Log in to change restaurant menu.</p>
          )}
        </header>

        <div className="list">
          {this.renderFoodItems()}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('FoodItems');

  return {
    foodItems: FoodItems.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(HomePage);
