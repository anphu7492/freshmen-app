import { Groups } from './groups.js';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insert = new ValidatedMethod({
  name: 'groups.insert',
  validate: new SimpleSchema({
    name: {type: String, unique: true}
  }).validator(),
  run({ name }) {
    let currentUser = Meteor.user();
    if (!currentUser || currentUser.role !== 'coordinator') {
      throw new Meteor.Error('Unauthorized', 'You do not have permission to create group.')
    }
    const newGroup = {
      name: name,
      createdAt: new Date(),
      creator: this.userId
    };

    try {
      Groups.insert(newGroup);
    } catch(err) {
      if (err.code === 11000) {
        throw new Meteor.Error('Duplicate', 'Group name has been taken. Choose another name.');
      } else {
        throw new Meteor.Error('Server Error', 'Something went wrong.');
      }
    }

  }
});

const GROUPS_METHODS = _.pluck([
  insert
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(GROUPS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
