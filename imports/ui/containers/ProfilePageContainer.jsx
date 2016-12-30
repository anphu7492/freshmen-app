import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ProfilePage from '../pages/ProfilePage.jsx';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';

const ProfilePageContainer = createContainer(({params: { id }}) => {
  const allUserDataHandle = Meteor.subscribe('allUserData');
  const groupsHandle = Meteor.subscribe('groups.all');
  const postsHandle = Meteor.subscribe('posts.query');
  const loading = !(allUserDataHandle.ready() && groupsHandle.ready() && postsHandle.ready());
  const user = Meteor.users.findOne(id);
  const userExists = !loading && !!user;

  return {
    loading,
    user,
    group: userExists ? Groups.findOne(user.group) : {},

  };
}, ProfilePage);

export default ProfilePageContainer;
