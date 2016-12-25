import { Posts } from './posts';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insert = new ValidatedMethod({
  name: 'posts.update',
  validate: new SimpleSchema({
    type: {
      type: String,
      // allowedValues: ['simple', 'event', 'task']
    },
    text: {
      type: String,
      // max: 1000
    }
  }).validator(),
  run({ type, text }) {
    console.log('create post', type, text);
    let newPost = {
      type: type,
      text: text
    };
    newPost.creator = Meteor.userId();

    Posts.insert(newPost);
  }
});

const POSTS_METHODS = _.pluck([
  insert
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(POSTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
