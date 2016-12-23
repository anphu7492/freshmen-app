import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insert = new ValidatedMethod({
  name: 'posts.insert',
  validate: new SimpleSchema({
    type: {
      type: String,
      allowedValues: ['simple', 'event', 'task']
    },
    text: {
      type: String,
      max: 1000,
      optional: true
    }
  }).validator(),
  run({ type, text }) {
    console.log('create post', type, text);
  }
});