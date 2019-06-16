import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './FoodItemForm.css';

export default class FoodItemForm extends Component {
  constructor(props) {
    super(props);

    this.onImgBlur = this.onImgBlur.bind(this);
  }

  onImgBlur(event, setFieldError) {
    const img = new Image();
    img.onload = () => {
      this.props.onImgBlur(event);
    }
    img.onerror = (err) => {
      console.log(err);
      setFieldError('imgUrl', ' * Bad image url - not working');
    }
    img.src = event.target.value;
  }

  render() {
    let initValues = {
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
        {({ isSubmitting, handleBlur, setFieldValue, setFieldError, setFieldTouched }) => (
          <Form className="food-item-form">
            <Field type="hidden" name="_id" />
            <p>
              <label>Food name:</label>
              <Field
                type="text"
                name="name"
                placeholder="Food name"
              />
              <br />
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
              <br />
              <ErrorMessage name="price" className="error" component="span" />
            </p>

            <p>
              <label>Food image url</label>
              <Field
                type="text"
                name="imgUrl"
                placeholder="Food image URL"
                onBlur={e => {
                  e.persist();
                  console.log('onBlur: ', e);
                  this.onImgBlur(e, setFieldError);
                  //handleBlur(e);
                  console.log('setting field value: ', e.target.value);
                  setFieldTouched('imgUrl', true, false);
                }}
              />
              <br />
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
