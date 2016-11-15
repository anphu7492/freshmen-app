import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Groups } from '../groups.js';

Meteor.publish('groups.query', function queryGroups(params) {
  new SimpleSchema({
    _id: { type: String }
  }).validate(params);

  const { groupId } = params;

  return Groups.findOne({
    _id: groupId
  });
});

Meteor.publish('groups.all', function queryAllGroups() {
  if (!this.userId) {
    return this.ready();
  }

  return Groups.find();
});