import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js';
import StudentDashboard from '../pages/StudentDashboard';

const StudentPageContainer = createContainer(() => {
  const postsHandle = Meteor.subscribe('posts.query');
  const loading = !postsHandle.ready();
  return {
    loading,
    posts: Posts.find({
      $or: [
        {group: {$exists: false}},
        {group: Meteor.user().group}
      ]
    }).fetch()
  };
}, StudentDashboard);

export default StudentPageContainer;
