import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js';
import TutorDashboard from '../pages/TutorDashboard';

const TutorPageContainer = createContainer(() => {
  const postsHandle = Meteor.subscribe('posts.query');
  const loading = !postsHandle.ready();

  return {
    loading,
    posts: Posts.find({
      $or: [
        {group: {$exists: false}},
        {group: Meteor.user().group}
      ]
    }, { sort: { createdAt: -1}}).fetch()
  };
}, TutorDashboard);

export default TutorPageContainer;
