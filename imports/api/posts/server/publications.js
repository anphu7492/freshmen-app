import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts';

Meteor.publish('posts.query', function queryPost(params) {
  if (!this.userId) {
    return this.ready();
  }

  return Posts.find();
});
