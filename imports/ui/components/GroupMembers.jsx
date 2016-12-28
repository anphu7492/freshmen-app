import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import UserInfo from './UserInfo.jsx';
import { Groups } from '../../api/groups/groups.js';

export default class GroupMembers extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const group = Groups.findOne(user.group);
    const members = Meteor.users.find({group: user.group, role: 'student'}).fetch();

    let TutorCards = [];
    if (user.role === 'student') {
      const tutors = Meteor.users.find({group: user.group, role: 'tutor'}).fetch();
      TutorCards = tutors.map(tutor => (
        <UserInfo user={tutor} key={tutor._id} />
      ));
    } else {
      //what if there is another tutor? Doesn't care?
      TutorCards = (<div>{user.profile.name}</div>);
    }

    let studentList = [];
    if (members.length) {
      studentList = members.map(member => (
        <StudentCard user={member} key={member._id} />
      ));
    }

    return (
      <div className="tutor-rightbar">
        <h3>{group.name}</h3>
        <div>Tutor</div>
        {TutorCards}
        <hr/>
        <div id="group-section">
          {studentList}
        </div>
      </div>
    )
  }
}

GroupMembers.propTypes = {
  user: React.PropTypes.object
};