import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';

Accounts.validateNewUser(function(user) {
  console.log('validate', user);

  return user;
});

Accounts.onCreateUser(function(options, user) {
  console.log('on create', options,  user);
  user.name = 'Phu Pham';
  return user;
});