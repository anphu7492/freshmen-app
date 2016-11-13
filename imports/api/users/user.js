import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';

Accounts.validateNewUser(function(user) {
  console.log('validate', user);

  return true;
});

Accounts.onCreateUser(function(options, user) {
  console.log('on create', options,  user);
  console.log('user', Meteor.user());

  let allowedRoles = ['tutor', 'student'];
  //TODO: validate required fields

  if (!Meteor.user || Meteor.user().role !== 'coordinator') {
    throw new Meteor.Error('Unauthorized', 'You don\'t have permission to take this action.');
  }
  if (allowedRoles.indexOf(options.role) === -1) {
    throw new Meteor.Error('Invalid role', 'Invalid role');
  }
  user.profile = options.profile;
  user.group = options.group;
  user.role = options.role;

  return user;
});