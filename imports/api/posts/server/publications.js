import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts';

Meteor.publishComposite('posts.query', {
    find() {
      return Posts.find({});
    },
    children: [{
      find(post) {
        return Meteor.users.find({_id: post.author});
      }
    }]
});
