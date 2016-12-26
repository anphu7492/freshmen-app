import { Posts } from './posts';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insert = new ValidatedMethod({
  name: 'posts.update',
  validate: Posts.schema.pick([
    'type',
    'text',
    'event.location',
    'event.time',
    'task.todos',
    'task.todos.$',
    'task.todos.$._id',
    'task.todos.$.text'
  ])
  .validator(),
  run({ type, text, event, task }) {
    console.log('create post', type, text, event, task);
    let newPost = {
      type: type,
      text: text,
      event: event ? event : null,
      task: task ? task: null
    };
    newPost.creator = Meteor.userId();

    Posts.insert(newPost);
  }
});

export const remove = new ValidatedMethod({
  name:'posts.remove',
  validate: new SimpleSchema({
    _id: { type: String}
  }).validator(),
  run({ _id }) {
    const post = Posts.findOne(_id);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('Not authorized', 'Cannot remove post that is not yours');
    }

    console.log('userID', this.userId);
    Posts.remove({_id: _id, creator: this.userId});
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
