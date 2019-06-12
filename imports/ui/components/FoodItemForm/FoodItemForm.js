import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './FoodItemForm.css';

export default class FoodItemForm extends Component {
  render() {
    let initValues = {
      _id: '',
      name: '',
      price: 0,
      imgUrl: ''
    }

    if (this.props.data) {
      initValues = {
        _id: this.props.data._id,
        name: this.props.data.name,
        price: this.props.data.price,
        imgUrl: this.props.data.imgUrl
      }
    }
    console.log('init values: ', initValues);
    return (
      <Formik
        initialValues={initValues}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = ' * Required';
          }

          if (!values.price) {
            errors.price = ' * Required';
          }

          if (!values.imgUrl) {
            errors.imgUrl = ' * Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // simulate longer response
          console.log('values: ', values);
          setTimeout(() => {
            this.props.onSubmit(values, this.props);
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="hidden" name="_id" />
            <p>
              <label>Food name:</label>
              <Field
                type="text"
                name="name"
                placeholder="Food name"
              />
              <ErrorMessage name="name" className="error" component="span" />
            </p>

            <p>
              <label>Price in $:</label>
              <Field
                type="number"
                min="0"
                name="price"
                placeholder="Food price"
              />
              <ErrorMessage name="price" className="error" component="span" />
            </p>

            <p>
              <label>Food image url</label>
              <Field
                type="text"
                name="imgUrl"
                placeholder="Food image URL"
              />
              <ErrorMessage name="imgUrl" className="error" component="span" />
            </p>

            <p>
              <input type="submit" disabled={isSubmitting} value="Submit" />
            </p>
          </Form>
        )}
      </Formik>
    );
  }
}
