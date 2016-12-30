import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CoordinatorDashboard from '../pages/coordinator/CoordinatorDashboard.jsx';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';

const CoordinatorPageContainer = createContainer(() => {
  const groupsHandle = Meteor.subscribe('groups.all');
  const postsHandle = Meteor.subscribe('posts.query');
  const loading = !(groupsHandle.ready() && postsHandle.ready());

  const groups = Groups.find().fetch();
  return {
    loading,
    groups,
    posts: Posts.find({}, {sort: {createdAt: -1}}).fetch()
  };
}, CoordinatorDashboard);

export default CoordinatorPageContainer;
