import React, { Component } from 'react';

import FoodItemForm from './FoodItemForm';

export default class FoodItemFormContainer extends Component {
  constructor(props) {
    super(props);
    const imgUrl = this.props.data && this.props.data.imgUrl;

    this.state = {
      img: imgUrl || ''
    }

    this.onImgBlur = this.onImgBlur.bind(this);
  }

  onImgBlur(event) {
    this.setState({ img: event.target.value });
  }

  render() {
    return (
      <div className="row">
        <div className="col-50-percent">
          <FoodItemForm onSubmit={this.props.onSubmit} onImgBlur={this.onImgBlur} {...this.props} />
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
    )
  }
}
