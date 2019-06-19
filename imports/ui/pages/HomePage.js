import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { withTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import { FoodItems } from '../../api/FoodItems.js';
import FoodItem from '../components/FoodItem/FoodItem.js';
import Pagination from '../components/Pagination/Pagination';

const ITEMS_PER_PAGE = 5;
const pageNumber = new ReactiveVar(1);
const itemsCount = new ReactiveVar(0);

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
        <Pagination
          page={pageNumber.get()}
          itemsPerPage={ITEMS_PER_PAGE}
          itemsCount={this.props.itemsCount}
          {...this.props}
        />
      </div>
    );
  }
}

export default withTracker((props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  pageNumber.set(parseInt(query.page) || 1);
  const skip = (query.page - 1) * ITEMS_PER_PAGE;
  Meteor.subscribe('FoodItems', { skip, limit: ITEMS_PER_PAGE });

  Meteor.call('FoodItems.getCount', (err, result) => {
    if (err) {
      console.log(err);
    }
    itemsCount.set(result);
  });

  return {
    foodItems: FoodItems.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
    itemsCount: itemsCount.get(),
  };
})(HomePage);
