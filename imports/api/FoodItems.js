import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const FoodItems = new Mongo.Collection('foodItems');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish FoodItems that are public or belong to the current user
  Meteor.publish('FoodItems', ({ skip = 0, limit = 0 } = {}) => {
    check(skip, Match.Optional(Number));
    check(limit, Match.Optional(Number));
    console.log('skip, limit: ', skip, limit);
    return FoodItems.find(
      { owner: this.userId },
      {
        sort: { createdAt: 1 },
        skip,
        limit
      });
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
      description: Match.Optional(String),
    });

    // Make sure the user is logged in before inserting a foodItem
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const { name, price, imgUrl, description } = data;

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
      description: Match.Optional(String),
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
  },
  'FoodItems.getCount'() {
    return FoodItems.find().count();
  }
});
