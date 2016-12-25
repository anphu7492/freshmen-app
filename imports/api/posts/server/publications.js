import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts';

Meteor.publish('post.query', function queryPost(params) {
  console.log('post.query');
});
