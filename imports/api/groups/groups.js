import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GroupsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const _doc = doc;
    _doc.createdAt = _doc.createdAt || new Date();
    return super.insert(_doc, callback);
  }
}

export const Groups = new GroupsCollection('Groups');

Groups.deny({
  insert() { return true;}
});

Groups.schema = new SimpleSchema({
  name: {
    type: String,
    index: true,
    unique: true,
    max: 100
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    defaultValue: Date.now()
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});

Groups.attachSchema(Groups.schema);

Groups.publicFields = {
  name: 1,
  createdAt: 1
};