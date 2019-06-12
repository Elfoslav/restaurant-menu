import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import './FoodItem.css';

export default class FoodItem extends Component {
  deleteThisFoodItem() {
    Meteor.call('FoodItems.remove', this.props.foodItem._id);
  }

  render() {
    const { _id, name, price, imgUrl } = this.props.foodItem;
    return (
      <div className="food-item">
         <img className="image" src={imgUrl} alt={name}/>
         <div className="content">
            <h1><Link className="header" to={`/admin/food-item/${_id}/edit`}>{name}</Link></h1>
            <div className="price"> <h3> $ {price} </h3></div>
        </div>
      </div>
    );
  }
}
