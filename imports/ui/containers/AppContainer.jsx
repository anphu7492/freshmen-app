import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../api/groups/groups.js';
import { Lists } from '../../api/lists/lists.js';
import { Posts } from '../../api/posts/posts.js';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('lists.public');
  const privateHandle = Meteor.subscribe('lists.private');
  const userHandle = Meteor.subscribe('userData');
  const allUserData = Meteor.subscribe('allUserData');
  const groupsHandle = Meteor.subscribe('groups.all');
  const postsHandle = Meteor.subscribe('posts.query');

  return {
    user: Meteor.user(),
    loading: !(
      publicHandle.ready() &&
      privateHandle.ready() &&
      userHandle.ready() &&
      groupsHandle.ready() &&
      allUserData.ready() &&
      postsHandle.ready()
    ),
    groups: Groups.find().fetch(),
    users: Meteor.users.find().fetch(),
    tasks: Posts.find({type: "task", creator: Meteor.userId()}).fetch(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    rightMenuOpen: Session.get('rightMenuOpen'),
    lists: Lists.find({ $or: [
      { userId: { $exists: false } },
      { userId: Meteor.userId() },
    ] }, {sort: {createdAt: -1}}).fetch(),
  };
}, App);
