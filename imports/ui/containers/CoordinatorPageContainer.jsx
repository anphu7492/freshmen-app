import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CoordinatorDashboard from '../pages/coordinator/Dashboard.jsx';

const CoordinatorPageContainer = createContainer(() => {
  let data = [];
  return {
    data
  };
}, CoordinatorDashboard);

export default CoordinatorPageContainer;
