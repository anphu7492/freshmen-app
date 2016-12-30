import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts';

Meteor.publishComposite('posts.query', {
    find() {
      return Posts.find({}, {
        fields: Posts.publicFields,
        sort: {createdAt: -1}
      });
    },
    children: [{
      find(post) {
        return Meteor.users.find({_id: post.author}, {
          fields: {
            role: 1,
            profile: 1
          }
        });
      }
    }]
});
