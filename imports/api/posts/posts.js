import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import faker from 'faker';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class PostsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    console.log('doc', ourDoc);
    const result = super.insert(ourDoc, callback);
    return result;
  }
}

export const Posts = new PostsCollection('Posts');

Posts.deny({
  insert() { return true; },
  // update() { return true; },
  // remove() { return true; },
});

EventSchema = new SimpleSchema({
  location: {
    type: String,
    max: 100
  },
  time: {
    type: Date
  },
  going: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: []
  },
  notGoing: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: []
  },
  maybe: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: []
  }
});

TaskSchema = new SimpleSchema({
  todos: {
    type: [Object],
    max: 300
  },
  "todos.$._id": {
    type: String
  },
  "todos.$.text": {
    type: String
  },
  assignees: {
    type: [Object],
    maxCount: 20,
    defaultValue: []
  },
  "assignees.$.user": {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  "assignees.$.status": {
    type: String,
    allowedValues: ['ongoing', 'completed']
  }
});

CommentSchema = new SimpleSchema({
  content: {
    type: String,
    max: 1000
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  created: {
    type: Date,
    defaultValue: Date.now
  }
});

Posts.schema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['simple', 'event', 'task']
  },
  text: {
    type: String,
    max: 1000,
    optional: true
  },
  event: {
    type: EventSchema,
    optional: true
  },
  task: {
    type: TaskSchema,
    optional: true
  },
  comments: {
    type: [CommentSchema],
    defaultValue: []
  },
  group: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  createdAt: {
    type: Date,
    defaultValue: Date.now,
    denyUpdate: true,
  },
});


Posts.attachSchema(Posts.schema);

Posts.publicFields = {
  type: 1,
  text: 1,
  event: 1,
  task: 1,
  comments: 1,
  group: 1,
  creator: 1,
  createdAt: 1
};

Factory.define('post', Posts, {});

Posts.helpers({
  post() {
    return Posts.find({});
  },
  editableBy(userId) {
    if (!this.creator) {
      return true;
    }

    return this.creator === userId;
  },
});
