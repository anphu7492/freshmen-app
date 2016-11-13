import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const createUserFromCoordinator = new ValidatedMethod({
  name: 'user.create',
  validate: new SimpleSchema({
    email: {type: String},
    password: {type: String},
    'profile.name': {type: String},
    'profile.school': {type: String},
    'profile.major': {type: String},
    group: {type: String},
    role: {type: String}
  }).validator(),
  run({email, password, profile, group, role}) {
    console.log('aa', email, password, profile);
    Accounts.createUser({email, password, profile, group, role});
  }
});