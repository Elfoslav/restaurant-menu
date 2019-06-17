import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const FoodItems = new Mongo.Collection('foodItems');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish FoodItems that are public or belong to the current user
  Meteor.publish('FoodItems', () => {
    return FoodItems.find({ owner: this.userId });
  });

  Meteor.publish('FoodItem', (_id) => {
    return FoodItems.find({ _id, owner: this.userId });
  });
}

Meteor.methods({
  'FoodItems.insert'(data) {
    check(data, {
      name: String,
      price: Number,
      imgUrl: String,
      description: String,
    });

    // Make sure the user is logged in before inserting a foodItem
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const { name, price, imgUrl } = data;

    FoodItems.insert({
      name,
      price,
      imgUrl,
      description,
      createdAt: new Date(),
      owner: this.userId
    });
  },
  'FoodItems.update'(data) {
    check(data, {
      _id: String,
      name: String,
      price: Number,
      imgUrl: String,
      description: String,
    });

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    FoodItems.update({ _id: data._id }, { $set: data });
  },
  'FoodItems.remove'(foodItemId) {
    check(foodItemId, String);

    const foodItem = FoodItems.findOne(foodItemId);
    if (foodItem.owner !== this.userId) {
      // Make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    FoodItems.remove(foodItemId);
  },
  'FoodItems.get'(foodItemId) {
    check(foodItemId, String);
    return FoodItems.findOne(foodItemId);
  }
});
