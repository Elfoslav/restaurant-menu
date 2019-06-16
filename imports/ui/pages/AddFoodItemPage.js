import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import FoodItemForm from '../components/FoodItemForm/FoodItemForm';

export default class AddFoodItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ''
    }

    // Without this 'this' will be undefined in handleSubmit method
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImgBlur = this.onImgBlur.bind(this);
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

  onImgBlur(event) {
    console.log(event.target.value);
    this.setState({ img: event.target.value });
  }

  render() {
    return (
      <div>
        <header><h1>Add new food item</h1></header>
        <div className="row">
          <div className="col-50-percent">
            <FoodItemForm onSubmit={this.handleSubmit} onImgBlur={this.onImgBlur} {...this.props} />
          </div>
          <div className="col-50-percent">
            {this.state.img &&
              <div>
                <h3>Image preview</h3>
                <img src={this.state.img} alt="image" />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
