import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import faker from 'faker';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class PostsCollection extends Mongo.Collection{
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const posts = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Posts = new PostsCollection('Posts');
/*
Posts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
*/


Posts.schema = new SimpleSchema({
  postId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  text: {
    type: String,
    max: 1000,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
});

Posts.attachSchema(Posts.schema);

Posts.publicFields = {
  postId: 1,
  text: 1,
  createdAt: 1,
};

Factory.define('post', Posts, {
  postId: () => Factory.get('post'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

Posts.helpers({
  post() {
    return Posts.find({});
  },
  editableBy(userId) {
    return this.editableBy(userId);
  },
});
