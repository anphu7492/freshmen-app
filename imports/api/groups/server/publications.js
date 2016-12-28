import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Groups } from '../groups.js';

Meteor.publish('groups.query', function queryGroups(params) {
  if (!this.userId) {
    return;
  }

  new SimpleSchema({
    _id: { type: String }
  }).validate(params);

  const { groupId } = params;

  return Groups.find({
    _id: groupId
  });
});

Meteor.publishComposite('groups.all', function queryAllGroups() {
  if (!this.userId) {
    return this.ready();
  }

  return {
    find() {
      return Groups.find({});
    },
    children: [{
      find(group) {
        return Meteor.users.find({_id: group.creator}, {
          fields: {
            role: 1,
            profile: 1
          }
        });
      }
    }]
  }
});