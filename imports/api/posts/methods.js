import { Posts } from './posts';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
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
    'task.todos.$.text',
    'task.assignees.$.user',
    'task.assignees.$.status'
  ])
  .validator(),
  run({ type, text, event, task }) {
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

    Posts.remove({_id: _id, creator: this.userId});
  }
});

export const addComment = new ValidatedMethod({
  name: 'posts.addComment',
  validate: new SimpleSchema({
    content: {
      type: String,
      max: 1000
    },
    postId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run({ content, postId }) {
    let newComment = {
      _id: Random.id(),
      content: content,
      creator: this.userId,
      created: new Date()
    };

    Posts.update({_id: postId}, {
      '$push': {
        'comments': newComment
      }
    });

  }
});

export const markEventConfirmation = new ValidatedMethod({
  name: 'posts.markEventConfirmation',
  validate: new SimpleSchema({
    postId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    confirmation: {
      type: String,
      allowedValues: ['going', 'notGoing', 'maybe']
    }
  }).validator(),
  run({ postId, confirmation}) {

    const userId = this.userId;

    Posts.update({
      '_id': postId,
      'event.confirmations.user': userId
    }, {
      '$set': {
        'event.confirmations.$.status': confirmation
      }
    }, (err, numOfModified) => {
      if (err) {
        console.warn('Unexpected error', err);
        throw new Meteor.Error('Update failed', 'Something went wrong. Please try again later');
      }

      //if user is not in the list, do another update
      if (numOfModified === 0) {
        Posts.update({
          '_id': postId,
          'type': 'event'
        }, {
          '$push': {
            'event.confirmations': {'user': userId, 'status': confirmation}
          }
        });
      }
    });
  }
});

export const markTaskCompletion = new ValidatedMethod({
  name: 'posts.markTaskCompletion',
  validate: new SimpleSchema({
    postId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    status: {
      type: String,
      allowedValues: ['ongoing', 'completed']
    }
  }).validator(),
  run({ postId, status }) {

    Posts.update({
      '_id': postId,
      'task.assignees.user': this.userId
    }, {
      '$set': {
        'task.assignees.$.status': status
      }
    });
  }
});

export const removeComment = new ValidatedMethod({
  name: 'posts.removeComment',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    postId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run({ _id, postId }) {

    Posts.update({_id: postId}, {
      '$pull': {
        'comments': {
          _id: _id,
          creator: this.userId
        }
      }
    });

  }
});

const POSTS_METHODS = _.pluck([
  insert,
  remove,
  addComment,
  markEventConfirmation
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
