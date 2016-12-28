import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function() {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {
      fields: {
        'role': 1,
        'group': 1,
        'profile':1,
        'emails':1
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish("allUserData", function() {
  return Meteor.users.find({}, {
    fields : {
      '_id': 1,
      'role': 1,
      'profile': 1,
      'group': 1,
      'facebook': 1,
      'twitter': 1,
      'emails' : 1
    }
  });
});

Meteor.users.allow({
  update: function(userId, fields, modifier) {
    return true;
  }
});
