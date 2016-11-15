import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CoordinatorDashboard from '../pages/coordinator/CoordinatorDashboard.jsx';
import { Groups } from '../../api/groups/groups.js';

const CoordinatorPageContainer = createContainer(() => {
  const groupsHandle = Meteor.subscribe('groups.all');
  const loading = !groupsHandle.ready();

  const groups = Groups.find().fetch();
  return {
    loading,
    groups
  };
}, CoordinatorDashboard);

export default CoordinatorPageContainer;
