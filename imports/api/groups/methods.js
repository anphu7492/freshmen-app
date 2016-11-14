import { Groups } from './groups';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insert = new ValidatedMethod({
  name: 'groups.insert',
  validate: new SimpleSchema({
    name: {type: String, unique: true}
  }).validator(),
  run({ text }) {
    console.log('user', this.user);
    if (!this.user || this.user.role !== 'coordinator') {
      throw new Meteor.Error('Unauthorized', 'You do not have permission to create group.')
    }
    const newGroup = {
      text: text,
      createdAt: new Date(),
      creator: this.userId
    };

    Groups.insert(newGroup);
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
