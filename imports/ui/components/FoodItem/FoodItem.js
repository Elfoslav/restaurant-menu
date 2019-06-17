import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import './FoodItem.css';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.deleteFoodItem = this.deleteFoodItem.bind(this);
  }

  deleteFoodItem() {
    const canDelete = confirm(`Are you sure you want to delete this item: "${this.props.foodItem.name}"?`);
    if (canDelete) {
      Meteor.call('FoodItems.remove', this.props.foodItem._id, (err) => {
        if (err) {
          alert(err.message);
          console.log(err);
        }
      });
    }
  }

  render() {
    const { _id, name, price, imgUrl, description } = this.props.foodItem;
    const currentUser = Meteor.user();
    return (
      <div className="food-item">
         <img className="image" src={imgUrl} alt={name}/>
         <div className="content">
            <h1><Link className="header" to={`/admin/food-item/${_id}/edit`}>{name}</Link></h1>
            <div className="price"> <h3> $ {price} </h3></div>
            <div className="description">{description}</div>
        </div>
        {currentUser &&
          <div className="delete">
            <button className="delete-btn" title={`Delete ${name}`} onClick={this.deleteFoodItem}>x</button>
          </div>
        }
      </div>
    );
  }
}
